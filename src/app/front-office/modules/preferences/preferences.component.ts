import { AfterContentChecked, AfterViewChecked, Component, DoCheck, TemplateRef, inject } from '@angular/core';
import { BREADCRUMBS } from '../../constants/breadCrumbs';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { IService } from '../../../back-office/interfaces/serviceInterface';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faHeart, faMailBulk, faPhone, faPlus, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { ServiceComponent } from '../list-service/components/service/service.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { EmployeeFilterComponent } from './components/employee-filter/employee-filter.component';
import { StaffApiService } from '../../../back-office/service/staff-api.service';
import { IStaff } from '../../../back-office/interfaces/staffInterface';
import { CustomerServiceService } from '../../services/customer/customer-service.service';
import { AuthApiService } from '../../../back-office/service/auth-api.service';
import { jwtDecode } from 'jwt-decode';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule, FontAwesomeModule, ServiceComponent, EmployeeCardComponent, EmployeeFilterComponent],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss'
})
export class PreferencesComponent {
  speciality = "Tout";
  prefType = "Tout";
  searchQuery = "";
  isLoading = false;

  screenWidth = window.innerWidth || 0;

  faSearch = faSearch;
  faPhone = faPhone;
  faMail = faMailBulk;
  faClock = faClock;
  faHeart = faHeart;
  faPlus = faPlus;
  faSlidersH = faSlidersH;

  services: IService[] = [{
    category: "category",
    commission: 1000,
    duration: '2',
    name: 'test',
    price: 2000,
    _id: 'iiiiiid',
  }];

  staffs: IStaff[] = [];
  favoriteEmployees: string[] = [];

  constructor(private staffService: StaffApiService, private customerService: CustomerServiceService, private authService: AuthApiService) {
    this.getFavoriteEmployees();
    this.getStaffBySpeciality();
  }

  onResize(event: any) {
    console.log(event.target.innerWidth);
    this.screenWidth = event.target.innerWidth;
  }

  onSearch(e: any) {
    console.log(e);
  }

  queriedList = (list: any) => {
    const tempArray = list.filter((item: any) => {
      return Object.values(item).toString().toLowerCase().includes(this.searchQuery.toLowerCase());
    });
    return tempArray;
  }

  getStaffBySpeciality() {
    this.isLoading = true;
    this.staffService.getStaffBySpeciality(this.speciality).subscribe({
      next: (res) => {
        let tempArray = [];
        if (this.prefType === "Favoris") {
          tempArray = res.filter((item: IStaff) => this.favoriteEmployees.includes(item._id || ""));
        } else {
          tempArray = res;
        }

        if (this.searchQuery.trim() !== "" && !!this.searchQuery) {
          this.staffs = this.queriedList(tempArray);
        } else {
          this.staffs = tempArray;
        }

        this.isLoading = false;
      }

    })
  }

  getFavoriteEmployees() {
    const jwt_token = this.authService.getToken();
    if (jwt_token) {
      const decodedToken: any = jwtDecode(jwt_token);
      if (decodedToken._id) {
        this.isLoading = true;
        this.customerService.getFavoriteEmployees(decodedToken._id).subscribe({
          next: (res) => {
            this.favoriteEmployees = res.favoriteEmployees;
            console.log('fav', this.favoriteEmployees);
            this.isLoading = false;
          }
        })
      }
    }
  }

  handleChangeCategory(speciality: string) {
    this.speciality = speciality;
    this.getStaffBySpeciality();
  }

  handleChangePrefType(prefType: string) {
    this.prefType = prefType;
    this.getStaffBySpeciality();
  }

  handleSearchChange(textSearch: string) {
    this.searchQuery = textSearch;
    this.getStaffBySpeciality();
  }

  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
