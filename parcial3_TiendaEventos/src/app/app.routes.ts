import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';

export const routes: Routes = [
  { path: "inicio", component: HomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "carrito", component: CarritoComponent },
  { path: "edit", component: EditProfileComponent }
];
