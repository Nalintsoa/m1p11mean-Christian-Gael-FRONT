import { Component } from '@angular/core';
import { FilterComponent } from './components/filter/filter.component';
import { ServiceComponent } from './components/service/service.component';
import { NgFor } from '@angular/common';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BREADCRUMBS } from '../../constants/breadCrumbs';

@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [FilterComponent, ServiceComponent, NgFor, BreadcrumbComponent],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.scss'
})
export class ListServiceComponent {
  menuSelected = BREADCRUMBS[0];
  iterations = [1, 2, 3, 4, 5, 6, 7, 8, 9]

}
