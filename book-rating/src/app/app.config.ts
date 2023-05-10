import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ApiModule, Configuration } from './shared/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { bookFeature } from './store/book.reducer';
import { BookEffects } from './store/book.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    importProvidersFrom(ApiModule.forRoot(() => new Configuration({
        basePath: 'https://api.angular.schule',
    }))),
    provideStore(),
    // provideEffects(),

    provideState(bookFeature),
    provideEffects(BookEffects),

    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
