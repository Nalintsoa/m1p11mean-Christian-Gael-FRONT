import { Route } from '@angular/router';
import { HomePageComponent } from '../modules/home/pages/home-page/home-page.component';
import { ServiceListComponent } from '../modules/service/pages/service-list/service-list.component';
import { StaffListComponent } from '../modules/staff/pages/staff-list/staff-list.component';
import { StatisticListComponent } from '../modules/statistic/pages/statistic-list/statistic-list.component';

export const backOfficeRoutes: Route = {
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
};
