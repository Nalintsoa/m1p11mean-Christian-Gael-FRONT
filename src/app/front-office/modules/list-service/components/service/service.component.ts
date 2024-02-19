import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IService } from '../../../../../back-office/interfaces/serviceInterface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  @Input() service?: IService;
}
