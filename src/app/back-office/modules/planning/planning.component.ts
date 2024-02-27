import { Component, ElementRef, TemplateRef, ViewChild, inject } from '@angular/core';
import { PlanningService } from '../../service/planning.service';
import { AuthApiService } from '../../service/auth-api.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../common/breadcrumb/breadcrumb.component';
import { INavigationItem } from '../../interfaces/breadCrumbInterfaces';
import { PATH_BACKOFFICE } from '../../routes/back-office-route';
import { monthList } from '../../../config/monthList';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, FaIconComponent, TaskComponent],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent {
  faArrowRight = faArrowRight;
  rdvsDay: any = [];
  dateSelected: string = '';
  constructor(private planningService: PlanningService, private authApiService: AuthApiService) {
    this.initializePlanning();
  }

  pathsArray: INavigationItem[] = [
    {
      label: 'Planning',
      path: `${PATH_BACKOFFICE}/planning`,
    },
  ];

  planningArray: any = [];
  dates: string[] = [];
  hours: number[] = [];

  monthList = monthList;
  currentYear = new Date().getFullYear().toString();
  currentMonth = new Date().getMonth() + 1;

  modalInformations: {
    date: number | string,
    month: number | string,
    startHour: number | string,
    endHour: number | string,
    customerName: number | string,
    customerMail:  number | string,
    customerPhone:  number | string,
    serviceName:  number | string,
    serviceDuration:  number | string,
    servicePrice:  number | string,
    serviceAmountPaid:  number | string,
    serviceId:  number | string,
    _id: string,
  } = {
    date: '',
    month: '',
    startHour:'',
    endHour:'',
    customerName:'',
    customerMail: '',
    customerPhone: '',
    serviceName: '',
    serviceDuration: '',
    servicePrice: '',
    serviceAmountPaid: '',
    serviceId: '',
    _id: ''
  }

  initializePlanning() {
    this.getPlanningPerMonth(this.currentYear, this.currentMonth);
  }

  private getHours(): number[] {
    const firstDateData = this.planningArray[this.dates[0]] || [];
    return firstDateData.map((item: any) => item.hour);
  }

  getRdvStatus(date: string, hour: number): string {
    const rdvData = this.planningArray[date].find((item: any) => item.hour === hour);
    return rdvData ? (rdvData.rdvStatus ? 'Booked' : 'Available') : 'N/A';
  }

  getServiceInfo(date: string, hour: number) {
    const rdvData = this.planningArray[date].find((item: any) => item.hour === hour);
    this.modalInformations = {
      date: new Date(rdvData.date).getDate().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }),
      month: this.getMonthAccro(new Date(rdvData.date).getMonth()),
      customerMail: rdvData.customerMail,
      customerName: rdvData.customerName,
      customerPhone: rdvData.customerPhone,
      endHour: rdvData.endHour,
      serviceAmountPaid: rdvData.amountPaid,
      serviceDuration: rdvData.serviceDuration,
      serviceId: rdvData.serviceId,
      serviceName: rdvData.serviceName,
      servicePrice: rdvData.price,
      startHour: rdvData.startHour,
      _id: rdvData._id
    }
    this.modalService.open(this.infoModal, { centered: true });
  }

  handleChangeMonth(e: any) {
    this.getPlanningPerMonth(this.currentYear, e.target.value || this.currentMonth);
  }


  getPlanningPerMonth(yearPlan: string, monthPlan: string | number) {
    const jwt_token = this.authApiService.getToken();
    if (jwt_token) {
      const decodedToken: any = jwtDecode(jwt_token);
      if (decodedToken._id) {
        this.planningService.planningPerMonth(yearPlan, monthPlan, decodedToken._id).subscribe({
          next: (res) => {
            console.log(res);
            this.planningArray = res;
            this.dates = Object.keys(res);
            this.hours = this.getHours();
          }
        })
      }
    }
  }

  getFollowedTask(date: string) {
    this.dateSelected = date;
    this.planningService.getTasksDay(date).subscribe(
      data => { this.rdvsDay = data }
    )
  }

  @ViewChild('infoModal') infoModal !: ElementRef;
  // modal info futur-planning
  private modalService = inject(NgbModal);
	closeResult = '';

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
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

  getRdvById(rdv: string){
    this.planningService.getRdvById(rdv).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }

  getMonthAccro(month: number){
    return monthList.find(item => item.value === month+1)?.accro || '';
  }

  mailLoading = false;
  sendAlertRdvMail(rdv: string){
    this.mailLoading = true;
    this.planningService.sendAlertRdvMail(rdv).subscribe({
      next: (res) => {
        console.log(res);
        this.mailLoading = false;
      }
    })
  }
}
