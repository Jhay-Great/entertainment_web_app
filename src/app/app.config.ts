import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { movieReducer } from './state/moive.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MovieEffect } from './state/movie.effects';
import { authenticationInterceptor } from './interceptors/authentication/authentication.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideEffects(MovieEffect),
    provideState({ name: 'movies', reducer: movieReducer }),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
