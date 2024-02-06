import { Component } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { ServiceComponent } from './service/service.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [FilterComponent, ServiceComponent, NgFor],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.scss'
})
export class ListServiceComponent {


}
