import { Route } from '@angular/router';
import { ListServiceComponent } from '../modules/list-service/list-service.component';
import { MainComponent } from '../modules/main/main.component';
import { HistoriqueRdvComponent } from '../modules/historique-rdv/historique-rdv.component';
import { PreferencesComponent } from '../modules/preferences/preferences.component';
import { LoginFrontComponent } from '../modules/login-front/login-front.component';
import { CreateRdvComponent } from '../modules/create-rdv/create-rdv.component';
import { AuthGuardService } from './authGuard';
import { SoldePayComponent } from '../modules/solde-pay/solde-pay.component';
import { ForgetPasswordComponent } from '../modules/forget-password/forget-password.component';

export const frontOfficeRoutes: Route[] = [
    {
        path: 'front-office',
        component: MainComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                redirectTo: 'services',
                pathMatch: 'full',
            },
            {
                path: 'services',
                component: ListServiceComponent,
                canActivate: [AuthGuardService],
                title: 'Services',
            },
            {
                path: 'histo-rdv',
                component: HistoriqueRdvComponent,
                canActivate: [AuthGuardService],
                title: 'Rendez-vous',
            },
            {
                path: 'preferences',
                component: PreferencesComponent,
                canActivate: [AuthGuardService],
                title: 'Préférences',
            },
            {
                path: 'prise-rdv/:id',
                canActivate: [AuthGuardService],
                component: CreateRdvComponent,
                title: 'Rendez-vous',
            },
            {
                path: 'solde-pay',
                canActivate: [AuthGuardService],
                component: SoldePayComponent,
                title: 'Mon solde',
            },
        ],
    },
    {
        path: 'frontoffice',
        component: LoginFrontComponent,
    },
    {
        path: 'forgetPassword',
        component: ForgetPasswordComponent
    }
];
