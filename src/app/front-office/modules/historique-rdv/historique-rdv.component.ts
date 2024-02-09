import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BREADCRUMBS } from '../../constants/breadCrumbs';

@Component({
  selector: 'app-historique-rdv',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './historique-rdv.component.html',
  styleUrl: './historique-rdv.component.scss'
})
export class HistoriqueRdvComponent {
  menuSelected = BREADCRUMBS[1]
}
