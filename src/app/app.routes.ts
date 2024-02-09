import { Routes } from '@angular/router';
import { MainComponent } from './front-office/modules/main/main.component';
import { AppComponent } from './app.component';
import { frontOfficeRoutes } from './front-office/routes/front-office-routes';

export const routes: Routes = [
    ...frontOfficeRoutes,
    { path: 'back-office', component: AppComponent },
];
