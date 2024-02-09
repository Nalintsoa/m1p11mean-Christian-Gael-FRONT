import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FrontLinkComponent } from '../front-link/front-link.component';
import { HEADERMENUS } from '../../constants/links';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgFor, FrontLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuActivate: string = 'Services';
  menus = HEADERMENUS;

  onClick(data: string): void {
    this.menuActivate = data;
  }


}
