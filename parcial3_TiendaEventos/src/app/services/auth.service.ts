import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, reauthenticateWithCredential, EmailAuthProvider, updatePassword, updateEmail, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLogued = false;
  profile: any;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    public db: DatabaseService,
    public router: Router
  ) {
    this.verifyIsLogued();
    let storedProfile: any = localStorage.getItem('profile');
    if (storedProfile) {
      this.profile = JSON.parse(storedProfile);
    }
    let storedUser: any = localStorage.getItem('user');
    if (storedUser) {
      let user = JSON.parse(storedUser);
      this.getProfile(user?.uid);
    }
  }

  async registerUser(email: string, password: string, additionalData: { name: string; phone: string; username: string }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;

      const userDocRef = doc(this.firestore, `users/${userId}`);
      await setDoc(userDocRef, { ...additionalData, email });
      this.router.navigateByUrl('/login'); // Redirige al login después de registrar
      console.log('Usuario registrado y documento creado en Firestore');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      localStorage.setItem('user', JSON.stringify(userCredential.user)); // Guarda el usuario en el localStorage
      this.isLogued = true; // Marca al usuario como logueado
      localStorage.setItem('isLogued', 'true'); // Guarda el estado de autenticación en el localStorage
      console.log('Usuario autenticado:', userCredential.user);
      this.getProfile(userCredential.user.uid); // Obtiene el perfil del usuario
      this.router.navigateByUrl('/profile'); // Redirige al perfil del usuario
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  async logoutUser() {
    try {
      await signOut(this.auth);
      this.isLogued = false; // Marca al usuario como no logueado
      localStorage.removeItem('user'); // Remueve el usuario del localStorage
      localStorage.removeItem('profile'); // Remueve el perfil del localStorage
      localStorage.setItem('isLogued', 'false'); // Actualiza el estado de autenticación en el localStorage
      this.router.navigateByUrl('/login'); // Redirige al login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  verifyIsLogued() {
    const isLogued = localStorage.getItem('isLogued') === 'true'; // Verifica el estado de autenticación en el localStorage
    this.isLogued = isLogued; // Actualiza la variable `isLogued`
    return isLogued;
  }

  getProfile(uid: any) {
    this.db.getDocumentById('users', uid)
      .subscribe(
        (res: any) => {
          console.log('perfil desde firebase', res);
          localStorage.setItem('profile', JSON.stringify(res)); // Guarda el perfil en el localStorage
          this.profile = res;
        },
        (error: any) => { console.log(error); });
  }

  async verifyPassword(password: string): Promise<boolean> {
    const user = this.auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(user.email ?? '', password);
      try {
        await reauthenticateWithCredential(user, credential);
        return true;
      } catch (error) {
        console.error('Error al verificar la contraseña', error);
        return false;
      }
    }
    return false;
  }

  async updateUserPassword(newPassword: string): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, newPassword);
      } catch (error) {
        console.error('Error al actualizar la contraseña', error);
      }
    }
  }

  async updateUserProfile(updateData: any): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      try {
        if (updateData.email) {
          await updateEmail(user, updateData.email);
        }
        if (updateData.password) {
          await updatePassword(user, updateData.password);
        }
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        await updateDoc(userDocRef, updateData);
        this.getProfile(user.uid); // Actualiza el perfil después de realizar cambios
      } catch (error) {
        console.error('Error al actualizar el perfil', error);
        throw error; // Manejamos el error aquí para que se capture en el componente
      }
    }
  }
}
