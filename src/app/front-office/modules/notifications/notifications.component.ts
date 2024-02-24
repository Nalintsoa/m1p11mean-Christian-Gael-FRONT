import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IService } from '../../../back-office/interfaces/serviceInterface';
import { CardServiceComponent } from '../create-rdv/card-service/card-service.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, CardServiceComponent, RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  @Input() show?: boolean;
  @Input() services?: IService[] | any;
  @Input() activeFirstRow?: boolean;
  @Output() view = new EventEmitter();

  selectedService: any;

  onSelectService(data: any) {
    this.selectedService = data;
    this.view.emit();
  }
}
