import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ILink } from '../../models/linkInterface';

@Component({
  selector: 'app-front-link',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './front-link.component.html',
  styleUrl: './front-link.component.scss'
})
export class FrontLinkComponent {
  @Input() data?: ILink;
  @Output() newMenuEvent = new EventEmitter<string>();

  onClickLink(value?: string) {
    this.newMenuEvent.emit(value);
  }


}
