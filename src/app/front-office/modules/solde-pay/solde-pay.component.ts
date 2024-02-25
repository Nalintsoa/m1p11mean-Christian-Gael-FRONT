import { Component, Pipe } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPhone, faEnvelope, faUser, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { AuthApiService } from '../../../back-office/service/auth-api.service';
import { jwtDecode } from 'jwt-decode';
import { CustomerServiceService } from '../../services/customer/customer-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solde-pay',
  standalone: true,
  imports: [BreadcrumbComponent, FaIconComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './solde-pay.component.html',
  styleUrl: './solde-pay.component.scss'
})
export class SoldePayComponent {
  menu = {
    label: "Mon solde",
    path: "solde-pay",
    class: "fa fa-credit-card-alt"
  }

  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faMapMarker = faMapMarker;

  idCustomer = '';
  solde: number = 0;
  cardNumber: string[] = [];

  customerForm = new FormGroup({
    pseudo: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.min(14), Validators.max(14)]),

  })

  constructor(private authService: AuthApiService, private customerService: CustomerServiceService) {

  }

  ngOnInit() {
    this.getCustomerId();
    this.getInfoCustomer();
  }

  getInfoCustomer() {

    this.customerService.getCustomer(this.idCustomer).subscribe(data => {
      const { pseudo, email, address, phoneNumber, solde, cardNumber: userNumberCard } = data;
      this.customerForm.setValue({ pseudo, email, address, phoneNumber })
      this.cardNumber = userNumberCard.split(" ");
      this.solde = solde;
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
