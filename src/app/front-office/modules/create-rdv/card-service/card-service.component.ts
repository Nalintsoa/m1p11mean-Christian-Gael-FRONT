import { Component, Input, SimpleChanges } from '@angular/core';
import { IService } from '../../../../back-office/interfaces/serviceInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-service.component.html',
  styleUrl: './card-service.component.scss'
})
export class CardServiceComponent {
  @Input() service?: IService | any;

  isTodaySpecialOffer = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['service'])
      this.isTodaySpecialOffer = this.showSpecialOffer();
  }

  showSpecialOffer() {
    if (this.service?.startOffer && this.service?.endOffer) {
      const { startOffer, endOffer } = this.service
      const isTodayBetweenStartAndEnd =
        new Date() <= new Date(endOffer)
        &&
        new Date() >= new Date(startOffer);

      return isTodayBetweenStartAndEnd
    }
    return false;
  }
}
