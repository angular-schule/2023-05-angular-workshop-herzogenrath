import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ApiModule, Configuration } from './shared/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withComponentInputBinding()
    ),

    provideHttpClient(),
    importProvidersFrom(
      ApiModule.forRoot(
        () => new Configuration({
          basePath: 'https://api.angular.schule',
        })
      )
    )
  ]
};
