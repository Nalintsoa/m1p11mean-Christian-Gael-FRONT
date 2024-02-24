import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faHeart, faMailBulk, faPhone, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IStaff } from '../../../../../back-office/interfaces/staffInterface';
import { CustomerServiceService } from '../../../../services/customer/customer-service.service';
import { AuthApiService } from '../../../../../back-office/service/auth-api.service';
import { jwtDecode } from 'jwt-decode';
import { PreferencesComponent } from '../../preferences.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [FontAwesomeModule, PreferencesComponent, CommonModule, PreferencesComponent],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss'
})
export class EmployeeCardComponent {
  faSearch = faSearch;
  faPhone = faPhone;
  faMail = faMailBulk;
  faClock = faClock;
  faHeart = faHeart;
  faPlus = faPlus;

  @Input() staff!: IStaff;
  favoriteEmployees:string[] = [];

  constructor(private customerService: CustomerServiceService, private authService: AuthApiService, private preferencesComponent: PreferencesComponent){
    this.getFavoriteEmployees();
  }
  
  addOrRemoveEmployeeAsFavorite(employee?: string){
    const jwt_token = this.authService.getToken();
    if (jwt_token) {
      const decodedToken: any = jwtDecode(jwt_token);
      if (decodedToken._id) {
        this.customerService.addOrRemoveEmployeeAsFavorite(decodedToken._id, employee).subscribe({
          next: (res) => {
            this.getFavoriteEmployees();
            this.preferencesComponent.getFavoriteEmployees();
            this.preferencesComponent.getStaffBySpeciality();
          }
        })
      }
    }
  }

  getFavoriteEmployees() {
    const jwt_token = this.authService.getToken();
    if (jwt_token) {
      const decodedToken: any = jwtDecode(jwt_token);
      if (decodedToken._id) {
        this.customerService.getFavoriteEmployees(decodedToken._id).subscribe({
          next: (res) => {
            this.favoriteEmployees = res.favoriteEmployees;
          }
        })
      }
    }
  }
}

