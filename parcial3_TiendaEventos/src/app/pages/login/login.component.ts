import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrección del nombre del atributo
})
export class LoginComponent implements OnDestroy {

  loginForm: FormGroup;
  constructor(
    public auth: AuthService,
    private fb: FormBuilder
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
      this.auth.loginUser(email, password);
    } else {
      console.log('formulario invalido', this.loginForm);
      alert('revise sus datos');
    }
  }

  onLoginWithGoogle() {
    this.auth.loginWithGoogle()
      .then(() => {
        console.log('Inicio de sesión con Google exitoso');
      })
      .catch(error => {
        console.error('Error al iniciar sesión con Google', error);
        alert('Hubo un error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
      });
  }
}
