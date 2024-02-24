import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb.component';
import { BREADCRUMBS } from '../../../../constants/breadCrumbs';

@Component({
  selector: 'app-employee-filter',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, BreadcrumbComponent],
  templateUrl: './employee-filter.component.html',
  styleUrl: './employee-filter.component.scss',
})
export class EmployeeFilterComponent {
  faSearch = faSearch;
  menuSelected = BREADCRUMBS[2];

  @Output() categoryEmitter = new EventEmitter<string>();
  @Output() prefTypeEmitter = new EventEmitter<string>();
  @Output() searchEmitter = new EventEmitter<string>();
  @Input() searchQuery = "";

  categoryItems = ['Tout', 'Manucure', 'Pédicure', 'Soin du visage', 'Massothérapie'];

  handleChangeCategory(event: any){
    this.categoryEmitter.emit(event.target.value);
  }

  handleChangePrefType(event: any){
    this.prefTypeEmitter.emit(event.target.value);
  }

  handleSearchChange(event: any){
    this.searchEmitter.emit(event.target.value);
    this.searchQuery = event.target.value;
  }
}
