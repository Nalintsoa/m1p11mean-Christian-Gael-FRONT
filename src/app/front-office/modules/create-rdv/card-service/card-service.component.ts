import { Component, Input } from '@angular/core';
import { IService } from '../../../../back-office/interfaces/serviceInterface';

@Component({
  selector: 'app-card-service',
  standalone: true,
  imports: [],
  templateUrl: './card-service.component.html',
  styleUrl: './card-service.component.scss'
})
export class CardServiceComponent {
  @Input() service?: IService;
}
