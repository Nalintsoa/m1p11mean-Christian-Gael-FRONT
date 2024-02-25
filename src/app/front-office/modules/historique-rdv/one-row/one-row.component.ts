import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClock, faCalendar, faMoneyBill, faArrowRight, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ModalPaimentComponent } from '../modal-paiment/modal-paiment.component';


@Component({
  selector: 'app-one-row',
  standalone: true,
  imports: [FaIconComponent, CommonModule, ModalPaimentComponent],
  templateUrl: './one-row.component.html',
  styleUrl: './one-row.component.scss'
})
export class OneRowComponent {
  faClock = faClock;
  faCalendar = faCalendar;
  faMoneyBill = faMoneyBill;
  faArrowRight = faArrowRight;
  faCreditCard = faCreditCard;

  @Input() rdv?: any;
  @Input() customer?: any;
  @Output() refresh = new EventEmitter()

  transformNumbreToHour(number: Number) {
    return number.toString().padStart(2, '0').concat(" : 00");
  }

  reloadParent() {
    this.refresh.emit()
  }
}
