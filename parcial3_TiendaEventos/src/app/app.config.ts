import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
///////// importar firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

///////// importar httopclient module de forma global
import { HttpClientModule } from '@angular/common/http';
import { NgModel, ReactiveFormsModule } from '@angular/forms';

///// para login y registro ////
import { Auth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [

    importProvidersFrom(HttpClientModule, ReactiveFormsModule, AngularFireAuthModule,
      CommonModule),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyAh92vXtrfUKAVGtcjPnFR-xOlTd8MHtsI",
      authDomain: "tiendadeeventos-42f0b.firebaseapp.com",
      projectId: "tiendadeeventos-42f0b",
      storageBucket: "tiendadeeventos-42f0b.firebasestorage.app",
      messagingSenderId: "186709779013",
      appId: "1:186709779013:web:f777cab1d04c6df314f92c"
    })),

    ////// para login y registro
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)]
};