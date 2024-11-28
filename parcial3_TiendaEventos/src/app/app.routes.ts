import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { EventoComponent } from './pages/evento/evento.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { ConfirmacionCompraComponent } from './pages/confirmacioncompra/confirmacioncompra.component';
import { ConfirmacionExitosaComponent } from './pages/confirmacion-exitosa/confirmacion-exitosa.component';

export const routes: Routes = [
  { path: "inicio", component: HomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "carrito", component: CarritoComponent },
  { path: "edit", component: EditProfileComponent },
  { path: "forgot", component: ForgotPasswordComponent },
  { path: 'evento/:id', component: EventoComponent },
  { path: "reco", component: RecomendacionesComponent },
  { path: 'checkout', component: ConfirmacionCompraComponent },
  { path: 'confirmacion-exitosa', component: ConfirmacionExitosaComponent }, // Nueva ruta 
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/inicio' }
];
