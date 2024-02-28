import { Component, Input, SimpleChanges } from '@angular/core';
import { IService } from '../../../../back-office/interfaces/serviceInterface';
import { CommonModule } from '@angular/common';
import { API_URL } from '../../../../../config/config';

@Component({
  selector: 'app-card-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-service.component.html',
  styleUrl: './card-service.component.scss'
})
export class CardServiceComponent {
  @Input() service?: IService | any;

  API_URL = API_URL;

  isTodaySpecialOffer = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['service'])
      this.isTodaySpecialOffer = this.showSpecialOffer();
  }

  showSpecialOffer() {
    if (this.service?.startOffer && this.service?.endOffer) {
      const { endOffer } = this.service
      const isTodayBetweenStartAndEnd =
        new Date() <= new Date(endOffer);

      return isTodayBetweenStartAndEnd
    }
    return false;
  }
}
