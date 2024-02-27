import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FaIconComponent, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  faSearch = faSearch;
  price?: number = 100000;
  @Output() searchEmitter = new EventEmitter<string>();
  @Output() categoryEmitter = new EventEmitter<string>();
  @Output() prefTypeEmitter = new EventEmitter<string>();
  @Output() priceEmitter = new EventEmitter<number>()

  categoryItems = ['Tout', 'Manucure', 'Pédicure', 'Soin du visage', 'Massothérapie'];

  // TODO: filter services front-office
  onSearch(event: any) {
    this.searchEmitter.emit(event.target.value)
  }

  onChangeCategory(event: any) {
    this.categoryEmitter.emit(event.target.value);
  }

  onChangePrice(event: any) {
    this.price = event.target.value;
    this.priceEmitter.emit(event.target.value);
  }


}
