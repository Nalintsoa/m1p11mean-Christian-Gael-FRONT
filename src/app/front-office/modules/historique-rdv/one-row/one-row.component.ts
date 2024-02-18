import { Component, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClock, faCalendar, faMoneyBill } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-one-row',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './one-row.component.html',
  styleUrl: './one-row.component.scss'
})
export class OneRowComponent {
  faClock = faClock;
  faCalendar = faCalendar;
  faMoneyBill = faMoneyBill;

  @Input() rdv?: any;

  transformNumbreToHour(number: Number) {
    return number.toString().padStart(2, '0').concat(" : 00");
  }
}
