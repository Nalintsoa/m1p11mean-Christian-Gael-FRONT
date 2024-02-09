import { Routes } from '@angular/router';
import { frontOfficeRoutes } from './front-office/routes/front-office-routes';
import { backOfficeRoutes } from './back-office/routes/back-office-route';

export const routes: Routes = [
    ...frontOfficeRoutes,
  backOfficeRoutes
];
