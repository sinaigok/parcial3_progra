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
import { HistorialComprasComponent } from './pages/historial-compras/historial-compras.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EventoEditableComponent } from './pages/evento-editable/evento-editable.component';
import { ProfileAdminComponent } from './pages/profile-admin/profile-admin.component';
import { NewEventComponent } from './pages/new-event/new-event.component';
import { CrearReviewComponent } from './pages/crear-review/crear-review.component';
import { ReiewsComponent } from './pages/reiews/reiews.component';
import { GiftCardComponent } from './pages/gift-card/gift-card.component';
import { GiftcardEditableComponent } from './pages/giftcard-editable/giftcard-editable.component';
import { NewGiftcardComponent } from './pages/new-giftcard/new-giftcard.component';
import { Component } from '@angular/core';

export const routes: Routes = [
  { path: "inicio", component: HomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "carrito", component: CarritoComponent },
  { path: "edit", component: EditProfileComponent },
  { path: "forgot", component: ForgotPasswordComponent },
  { path: 'evento/:id', component: EventoComponent },
  {path: 'evento_edit/:id', component: EventoEditableComponent},
  // {path: 'gitfedit/:id',component:EditgiftComponent},
  { path: "reco", component: RecomendacionesComponent },
  { path: 'checkout', component: ConfirmacionCompraComponent },
  { path: 'confirmacion-exitosa', component: ConfirmacionExitosaComponent },
  { path: 'historial-compras', component: HistorialComprasComponent },
  {path: 'admin',component:AdminComponent},
  {path: 'new', component:NewEventComponent},
  { path: 'make-review/:id', component: CrearReviewComponent },
  { path: 'review/:id', component: ReiewsComponent},
  {path: 'profile-admin', component:ProfileAdminComponent},
  { path: 'gift-card', component: GiftCardComponent },
  { path: 'new-giftcard', component: NewGiftcardComponent },
  { path: 'giftcard-editable/:id', component: GiftcardEditableComponent },
  // {path: 'make-giftcard', component: MakeGiftcardComponent},
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/inicio' }
];
