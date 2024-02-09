import { Routes } from '@angular/router';
import { MainComponent } from './front-office/modules/main/main.component';
import { AppComponent } from './app.component';
import { frontOfficeRoutes } from './front-office/routes/front-office-routes';
import { HomePageComponent } from './back-office/modules/home/pages/home-page/home-page.component';
import { StaffListComponent } from './back-office/modules/staff/pages/staff-list/staff-list.component';
import { ServiceListComponent } from './back-office/modules/service/pages/service-list/service-list.component';
import { StatisticListComponent } from './back-office/modules/statistic/pages/statistic-list/statistic-list.component';

export const routes: Routes = [
    ...frontOfficeRoutes,
  {
    path: 'back-office',
    component: HomePageComponent,
    children: [
      {
        path: 'staff',
        component: StaffListComponent,
      },
      {
        path: 'service',
				component: ServiceListComponent,
      },
			{
        path: 'statistic',
				component: StatisticListComponent,
      },
    ],
  },
];
