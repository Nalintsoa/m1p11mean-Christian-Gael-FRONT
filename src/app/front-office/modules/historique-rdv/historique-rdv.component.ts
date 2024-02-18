import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BREADCRUMBS } from '../../constants/breadCrumbs';
import { OneRowComponent } from './one-row/one-row.component';
import { CommonModule } from '@angular/common';
import { RdvService } from '../../services/rdv/rdv.service';

@Component({
  selector: 'app-historique-rdv',
  standalone: true,
  imports: [BreadcrumbComponent, OneRowComponent, CommonModule],
  templateUrl: './historique-rdv.component.html',
  styleUrl: './historique-rdv.component.scss'
})
export class HistoriqueRdvComponent {
  menuSelected = BREADCRUMBS[4];
  histo: any = []

  constructor(private rdvService: RdvService) { };

  ngOnInit() {
    this.getHisto();
  }

  getHisto() {
    this.rdvService.getHistory().subscribe((data: any) => this.histo = data);
  }

}
