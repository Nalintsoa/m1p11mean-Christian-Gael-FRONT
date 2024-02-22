import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IService } from '../../../../../back-office/interfaces/serviceInterface';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CustomerServiceService } from '../../../../services/customer/customer-service.service';
import { AuthApiService } from '../../../../../back-office/service/auth-api.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgFor, RouterLink, FontAwesomeModule, CommonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  faHeart = faHeart;
  @Input() service?: IService;

  preferences: any = [];
  idCustomer: string = '';
  constructor(private customerService: CustomerServiceService, private authService: AuthApiService){
    this.getCustomerId();
    this.getCustomerInformations();
  }

  getCustomerInformations() {
    if (this.idCustomer !== "") {
      this.customerService.getCustomer(this.idCustomer).subscribe({
        next: (res) => {
          this.preferences = res.preferences;
        },
        error(err) {
          console.log(err);
        },
      })
    }
  }

  addOrRemoveServiceToPreferences(serviceId?: string ){
    const jwtToken = this.authService.getToken();
    if (jwtToken) {
      const decodeToken: any = jwtDecode(jwtToken);
      if(decodeToken._id && serviceId) {
        const idCustomer = decodeToken._id;
        this.customerService.addOrRemoveServiceToPreferences(idCustomer, serviceId).subscribe({
          next: (res) => {
            this.preferences = res.result.preferences
          }
        })
      }
    }
  }

  getCustomerId(){
    const jwtToken = this.authService.getToken();
    if (jwtToken) {
      const decodeToken: any = jwtDecode(jwtToken);
      if(decodeToken._id) {
        this.idCustomer = decodeToken._id;
      }
    }
  }
}
