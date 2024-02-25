import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-confirm-rdv',
  standalone: true,
  imports: [],
  templateUrl: './confirm-rdv.component.html',
  styleUrl: './confirm-rdv.component.scss'
})
export class ConfirmRdvComponent {
  @Input() amount: number = 0;
  @Output() respond = new EventEmitter<boolean>()

  constructor() { }

  getThirtyPercent(data: number) {
    if (data) {
      return data * 30 / 100
    }
    return
  }

  onRespond(data: boolean) {
    this.respond.emit(data);
  }



}
