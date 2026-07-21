import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth/web-extension';

import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(),

    provideFirebaseApp(() =>
  initializeApp({
     apiKey: "AIzaSyAsljVre6iFAfKyzKiLEtRkMN1ukkwi3wc",
  authDomain: "modulo-c1980.firebaseapp.com",
  projectId: "modulo-c1980",
  storageBucket: "modulo-c1980.firebasestorage.app",
  messagingSenderId: "936365011803",
  appId: "1:936365011803:web:77400c0aaeaa8f5059207e",
  measurementId: "G-J46B5J7L96"
  })
),

    provideAuth(() => getAuth()),

    
  ]
};