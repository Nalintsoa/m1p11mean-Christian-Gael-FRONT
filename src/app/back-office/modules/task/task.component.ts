import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() date?: string;
  @Input() rdvsDay: any;

  transformNumbreToHour(number: Number) {
    return number.toString().padStart(2, '0').concat(" : 00");
  }


}
