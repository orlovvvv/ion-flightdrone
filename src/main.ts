import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InjectionToken, enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { Account, Client } from 'appwrite';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { errorHandlerInterceptor } from './app/shared/interceptor/error-handler.interceptor';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export const AUTH = new InjectionToken('Appwrite auth', {
  providedIn: 'root',
  factory: () => {
    const client = new Client()
      .setEndpoint(environment.endpoint)
      .setProject(environment.projectId);

    const auth = new Account(client);

    return auth;
  },
});


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'md' }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorHandlerInterceptor])),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
});
