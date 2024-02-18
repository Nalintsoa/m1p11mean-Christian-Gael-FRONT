import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BREADCRUMBS } from '../../constants/breadCrumbs';
import { IService } from '../../../back-office/interfaces/serviceInterface';
import { ServiceService } from '../../../back-office/services/service/service.service';
import { RdvService } from '../../services/rdv/rdv.service';
import { data } from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-rdv',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent
  ],
  templateUrl: './create-rdv.component.html',
  styleUrl: './create-rdv.component.scss'
})
export class CreateRdvComponent {
  menu = BREADCRUMBS[1];

  filterData: { date: string, category: string } = { date: '', category: '' };

  formattedArray: any = [];

  services: IService[] = [];

  serviceSelected?: IService;

  errorMessage?: string;
  successMessage?: string;

  columnToColor: any = [];

  dataToSend = {};

  constructor(private serviceService: ServiceService, public rdvService: RdvService, private router: Router) { }

  ngOnInit(): void {
    this.getServices();
  }

  getCells(row: any): any[] {
    return Object.values(row);
  }


  onClickCell = (rowNumber: number, columnNumber: number, item: any) => {
    const duration = Number(this.serviceSelected?.duration);
    const row = this.getCells(this.formattedArray[rowNumber]);
    const startHour = item.value;
    const endHour = startHour + duration;
    this.errorMessage = undefined;

    for (let i = columnNumber; i < columnNumber + duration; i++) {
      this.columnToColor.push(i);
      if (row[i].dispo === false) {
        this.columnToColor = [];
        this.errorMessage = "Impossible de réserver";
        return;
      }
    }

    this.reinitColorCell(rowNumber);
    this.onColorCell(rowNumber);

    this.dataToSend = {
      service: this.serviceSelected?._id,
      startHour,
      endHour,
      employee: item?._id,
      date: this.filterData.date,
      customer: 'test123'
    }

  }

  onColorCell(row: number) {
    for (let j = 0; j < this.columnToColor.length; j++) {
      this.formattedArray[row][this.columnToColor[j] + 7] = { ...this.formattedArray[row][this.columnToColor[j] + 7], statusTemp: true }
    }
  }

  reinitColorCell(row: number) {
    for (let j = 0; j < this.columnToColor.length; j++) {
      this.formattedArray[row][this.columnToColor[j] + 7] = { ...this.formattedArray[row][this.columnToColor[j] + 7], statusTemp: false }
    }
  }

  getServices() {
    this.serviceService.getServices().subscribe(data => this.services = data);
  }

  onCheckDispo(event: any) {

    const { name, value } = event.target;

    if (name === "service") {
      const service = this.services.find(service => service._id === value);
      this.serviceSelected = service;
      this.filterData = { ...this.filterData, category: service?.category ?? '' }
    } else {
      this.filterData = { ...this.filterData, [name]: value }
    }

    if (this.filterData.category !== "" && this.filterData.date !== "")
      this.rdvService.checkDisponibility(this.filterData).subscribe((data) => this.formattedArray = data)

  }

  onCreateRdv() {
    if (this.dataToSend) {
      this.errorMessage = undefined;
      this.rdvService.addRdv(this.dataToSend).subscribe((data) => {

        setTimeout(() => {
          this.filterData = { date: '', category: '' };
          this.dataToSend = {};
          this.successMessage = "Rendez-vous créé avec succès";
          this.rdvService.isLoading = false;
          this.successMessage = undefined;
          this.router.navigate(['front-office/services'])
        }, 5000);


      })
    } else {
      this.errorMessage = "Veuillez remplir tous remplir"
    }
  }
}

