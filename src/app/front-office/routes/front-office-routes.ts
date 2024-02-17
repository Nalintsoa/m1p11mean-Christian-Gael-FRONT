import { Route } from "@angular/router";
import { ListServiceComponent } from "../modules/list-service/list-service.component";
import { MainComponent } from "../modules/main/main.component";
import { NotificationsComponent } from "../modules/notifications/notifications.component";
import { HistoriqueRdvComponent } from "../modules/historique-rdv/historique-rdv.component";
import { PreferencesComponent } from "../modules/preferences/preferences.component";
import { OneServiceComponent } from "../modules/one-service/one-service.component";

export const frontOfficeRoutes: Route[] = [

    {
        path: 'front-office', component: MainComponent, children: [
            {
                path: '', redirectTo: 'services', pathMatch: 'full'
            },
            {
                path: 'services', component: ListServiceComponent
            },
            {
                path: 'notifications', component: NotificationsComponent
            },
            {
                path: 'histo-rdv', component: HistoriqueRdvComponent
            },
            {
                path: 'preferences', component: PreferencesComponent
            },
            {
                path: 'one-service', component: OneServiceComponent
            }
        ]
    },

]