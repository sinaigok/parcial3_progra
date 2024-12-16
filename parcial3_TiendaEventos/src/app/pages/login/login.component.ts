import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
  ],
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrección del nombre del atributo
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  isAdmin: boolean = false;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['test@ucb.edu.bo', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });
    console.log(auth.isLogued);
  }

  ngOnDestroy(): void {
    console.log('destroy login');
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('formulario valido', this.loginForm.value);
      const { email, password } = this.loginForm.value;
      this.auth.loginUser(email, password).then(() => {
        this.checkadmin();
        if (this.isAdmin) {
          this.router.navigate(['/profile-admin']);
        } else {
          this.router.navigate(['/profile']);
        }
      }).catch(() => {
        alert('Error en el inicio de sesión. Revise sus credenciales.');
      });
    } else {
      console.log('formulario invalido', this.loginForm);
      alert('revise sus datos');
    }
  }

  checkadmin() {
    const email = this.loginForm.get('email')?.value;
    const admins = ['nsophiacarrasco@gmail.com', 'gianira.salas@ucb.edu.bo'];
    let admin: boolean;

    if (admins.includes(email)) {
      admin = true;
      console.log('Es administrador');
    } else {
      admin = false;
      console.log('No es administrador');
    }

    // Guardar el valor de admin en localStorage y en el componente
    localStorage.setItem('admin', JSON.stringify(admin));
    this.isAdmin = admin;
  }
}
