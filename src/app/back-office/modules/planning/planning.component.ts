import { Component } from '@angular/core';
import { PlanningService } from '../../service/planning.service';
import { AuthApiService } from '../../service/auth-api.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../common/breadcrumb/breadcrumb.component';
import { INavigationItem } from '../../interfaces/breadCrumbInterfaces';
import { PATH_BACKOFFICE } from '../../routes/back-office-route';
import { monthList } from '../../../config/monthList';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent {

  constructor(private planningService: PlanningService, private authApiService: AuthApiService){
    this.initializePlanning();
  }

  pathsArray: INavigationItem[] = [
    {
      label: 'Planning',
      path: `${PATH_BACKOFFICE}/planning`,
    },
  ];

  planningArray:any = [];
  dates: string[] = [];
  hours: number[] = [];

  monthList = monthList;
  currentYear = new Date().getFullYear().toString();
  currentMonth = new Date().getMonth() + 1;

  initializePlanning() {
    // const jwt_token = this.authApiService.getToken();
    // if (jwt_token) {
    //   const decodedToken: any = jwtDecode(jwt_token);
    //   if (decodedToken._id) {
    //     this.planningService.planningPerMonth(this.currentYear, this.currentMonth, decodedToken._id).subscribe({
    //       next: (res) => {
    //         console.log(res);
    //         this.planningArray = res;
    //         this.dates = Object.keys(res);
    //         this.hours = this.getHours();
    //       }
    //     })
    //   }
    // }
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

  getServiceInfo(date: string, hour: number){
    const rdvData = this.planningArray[date].find((item: any) => item.hour === hour);
    console.log(rdvData);
  }

  handleChangeMonth(e: any) {
    // console.log("ceeeee", e.target.value);
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
}
