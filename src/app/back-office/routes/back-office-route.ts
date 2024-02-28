import { Route } from '@angular/router';
import { HomePageComponent } from '../modules/home/pages/home-page/home-page.component';
import { ServiceListComponent } from '../modules/service/pages/service-list/service-list.component';
import { StaffListComponent } from '../modules/staff/pages/staff-list/staff-list.component';
import { StatisticListComponent } from '../modules/statistic/pages/statistic-list/statistic-list.component';
import { EmployeeProfileComponent } from '../modules/employee-profile/employee-profile.component';
import { PlanningComponent } from '../modules/planning/planning.component';
import { TaskComponent } from '../modules/task/task.component';
import { LoginComponent } from '../modules/login/login.component';
import { AuthGuardService } from './authGuard';
import { AuthGuardManagerService } from './authGuardManager';

export const backOfficeRoutes: Route[] = [
  {
    path: 'back-office',
    component: HomePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'staff',
        pathMatch: 'full',
      },
      {
        path: 'staff',
        component: StaffListComponent,
        title: 'Personnel',
        canActivate: [AuthGuardManagerService]
      },
      {
        path: 'service',
        component: ServiceListComponent,
        title: 'Service',
        canActivate: [AuthGuardManagerService]
      },
      {
        path: 'statistic',
        component: StatisticListComponent,
        title: 'Statistique',
        canActivate: [AuthGuardManagerService]
      },
      {
        path: 'profile',
        component: EmployeeProfileComponent,
        title: 'Profil',
        canActivate: [AuthGuardService]
      },
      {
        path: 'planning',
        component: PlanningComponent,
        title: 'Rendez-vous',
        canActivate: [AuthGuardService]
      },
      {
        path: 'task',
        component: TaskComponent,
        title: 'Tâches',
        canActivate: [AuthGuardService]
      },
    ],
  },
  {
    path: 'backoffice',
    component: LoginComponent,
    title: 'Login',
  },
];

export const PATH_BACKOFFICE = '/back-office';
