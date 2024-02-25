import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BREADCRUMBS } from '../../constants/breadCrumbs';
import { OneRowComponent } from './one-row/one-row.component';
import { CommonModule } from '@angular/common';
import { RdvService } from '../../services/rdv/rdv.service';
import { CustomerServiceService } from '../../services/customer/customer-service.service';
import { AuthApiService } from '../../../back-office/service/auth-api.service';
import { jwtDecode } from 'jwt-decode';

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

  idCustomer = '';
  customer: any = {};

  constructor(private rdvService: RdvService, private customerService: CustomerServiceService, private authService: AuthApiService) {
    this.getHisto();
    this.getCustomerId();
    this.getInfoCustomer()
  };

  ngOnInit() {
    console.log("qsssss")

  }

  getHisto() {
    this.rdvService.getHistory().subscribe((data: any) => { this.histo = data });
  }

  getInfoCustomer() {

    this.customerService.getCustomer(this.idCustomer).subscribe(data => {
      this.customer = data;
    })
  }

  getCustomerId() {
    const jwtToken = this.authService.getToken();
    if (jwtToken) {
      const decodeToken: any = jwtDecode(jwtToken);
      if (decodeToken._id) {
        this.idCustomer = decodeToken._id;
      }
    }
  }

}
