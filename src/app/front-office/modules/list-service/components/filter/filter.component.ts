import { Component, EventEmitter, Output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  faSearch = faSearch;
  @Output() keySearch = new EventEmitter<string>();

  // TODO: filter services front-office
  onSearch(event: any) {
    this.keySearch.emit(event.target.value)
  }

}
