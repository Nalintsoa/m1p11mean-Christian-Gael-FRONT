import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgFor],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {

  iterations = [1, 2, 3, 4, 5]
}
