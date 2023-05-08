import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ApiModule, Configuration } from './shared/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

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
