import { Component } from '@angular/core';
import { FilterComponent } from './components/filter/filter.component';
import { ServiceComponent } from './components/service/service.component';
import { NgFor, NgIf } from '@angular/common';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BREADCRUMBS } from '../../constants/breadCrumbs';
import { ServiceService } from '../../../back-office/services/service/service.service';
import { IService } from '../../../back-office/interfaces/serviceInterface';

@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [FilterComponent, ServiceComponent, NgFor, NgIf, BreadcrumbComponent],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.scss'
})
export class ListServiceComponent {
  menuSelected = BREADCRUMBS[0];

  services: IService[] = [];

  constructor(private serviceService: ServiceService) { };

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.services = [];
    this.serviceService.getServices().subscribe(data => { this.services = data; });
  };


}
