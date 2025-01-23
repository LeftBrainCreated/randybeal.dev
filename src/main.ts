import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBl2XEsAm6fCIKqsRGoI8_Cw3HZbnvZhBc",
  authDomain: "randybeal-dev.firebaseapp.com",
  projectId: "randybeal-dev",
  storageBucket: "randybeal-dev.firebasestorage.app",
  messagingSenderId: "502721544635",
  appId: "1:502721544635:web:9296f6d1ce46d7cd06849e",
  measurementId: "G-8PT0F3465B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
