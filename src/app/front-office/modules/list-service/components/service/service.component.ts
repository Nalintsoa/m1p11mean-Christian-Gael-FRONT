import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IService } from '../../../../../back-office/interfaces/serviceInterface';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgFor],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  @Input() service?: IService;
}
