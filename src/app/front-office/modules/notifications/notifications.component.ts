import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IService } from '../../../back-office/interfaces/serviceInterface';
import { CardServiceComponent } from '../create-rdv/card-service/card-service.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, CardServiceComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  @Input() show?: boolean;
  @Input() service?: IService | any;
}
