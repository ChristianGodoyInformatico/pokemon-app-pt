import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { appReducer } from './app/store/app.reducer';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideAnimations(), provideStore({ app: appReducer }),],
}).catch((err) => console.error(err));
