import { Route } from "@angular/router";
import { ListServiceComponent } from "../modules/list-service/list-service.component";
import { MainComponent } from "../modules/main/main.component";
import { NotificationsComponent } from "../modules/notifications/notifications.component";
import { HistoriqueRdvComponent } from "../modules/historique-rdv/historique-rdv.component";
import { PreferencesComponent } from "../modules/preferences/preferences.component";
import { OneServiceComponent } from "../modules/one-service/one-service.component";
import { LoginFrontComponent } from "../modules/login-front/login-front.component";
import { CreateRdvComponent } from "../modules/create-rdv/create-rdv.component";

export const frontOfficeRoutes: Route[] = [
    {
        path: 'front-office', component: MainComponent, children: [
            {
                path: '', redirectTo: 'services', pathMatch: 'full'
            },
            {
                path: 'services', component: ListServiceComponent, title: "Services"
            },
            {
                path: 'notifications', component: NotificationsComponent, title: "Notifications"
            },

            {
                path: 'histo-rdv', component: HistoriqueRdvComponent, title: "Rendez-vous"
            },
            {
                path: 'preferences', component: PreferencesComponent, title: "Préférences"
            },
            // {
            //     path: 'one-service', component: OneServiceComponent
            // }
            {
                path: 'prise-rdv', component: CreateRdvComponent

            },
        ]
    },
    {
        path: 'frontoffice', component: LoginFrontComponent
    }
]