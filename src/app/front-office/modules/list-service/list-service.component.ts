import { Component } from '@angular/core';
import { FilterComponent } from './components/filter/filter.component';
import { ServiceComponent } from './components/service/service.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BREADCRUMBS } from '../../constants/breadCrumbs';
import { ServiceService } from '../../../back-office/services/service/service.service';
import { IService } from '../../../back-office/interfaces/serviceInterface';

@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [FilterComponent, ServiceComponent, CommonModule, BreadcrumbComponent],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.scss'
})
export class ListServiceComponent {
  menuSelected = BREADCRUMBS[0];

  services: IService[] = [];

  searchQuery: string = '';
  category: string = 'Manucure';
  defaultPrice = 1000000;
  price: number = this.defaultPrice;

  constructor(private serviceService: ServiceService) { };

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.services = [];
    this.serviceService.getServices().subscribe(data => {

      if (this.searchQuery !== "" || this.category !== "Tout" || this.price !== this.defaultPrice) {
        let tempArray = this.queriedList(data);
        if (this.price !== this.defaultPrice) {
          tempArray = tempArray.filter((item: any) => {
            return this.price >= item.price && 5000 <= item.price
          })
        }
        this.services = tempArray
      } else { this.services = data; }

    });
  };

  onSearch(key: string) {
    this.searchQuery = key;
    this.getServices();
  }

  onChangeCategory(category: string) {
    this.category = category;
    this.getServices();
  }

  onChangePrice(price: number) {
    this.price = price;
    this.getServices();
  }

  queriedList = (list: any) => {
    const tempArray = list.filter((item: any) => {
      return Object.values(item).toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        && item.category === this.category;
    });
    return tempArray;
  }


}