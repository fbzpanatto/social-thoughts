import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore' 

const firebaseConfig = {
  apiKey: "AIzaSyBG4DL6pMtu2ad37gliscCUDnzvlN-IDq8",
  authDomain: "social-thoughts-d0bb2.firebaseapp.com",
  projectId: "social-thoughts-d0bb2",
  storageBucket: "social-thoughts-d0bb2.appspot.com",
  messagingSenderId: "187871554935",
  appId: "1:187871554935:web:096ab9d2d0bb8c28478572",
  measurementId: "G-N6V44RFQZ2"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore())
    ])
  ]
};