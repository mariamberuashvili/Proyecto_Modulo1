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
    apiKey: "AIzaSyDbU4OLAwpBqj9od5QIyjp584cyrwjXXbI",
    authDomain: "del-test-fundesplai.firebaseapp.com",
    projectId: "del-test-fundesplai",
    storageBucket: "del-test-fundesplai.appspot.com",
    messagingSenderId: "11717140564",
    appId: "1:11717140564:web:4f6ceae6ce8a20dc5b4dc1",
    measurementId: "G-Y295ZNH0RH"
  })
),

    provideAuth(() => getAuth()),

    
  ]
};