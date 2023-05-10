import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { ApiModule, Configuration } from './shared/http';
import { BookEffects } from './store/book.effects';
import { bookFeature } from './store/book.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    importProvidersFrom(ApiModule.forRoot(() => new Configuration({
        basePath: 'https://api.angular.schule',
    }))),
    provideStore(),

    // manuell hinzufügen!
    provideState(bookFeature),
    provideEffects(BookEffects),

    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
