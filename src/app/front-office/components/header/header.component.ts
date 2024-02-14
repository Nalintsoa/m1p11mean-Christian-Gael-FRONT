import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FrontLinkComponent } from '../front-link/front-link.component';
import { HEADERMENUS } from '../../constants/links';
import { NgFor } from '@angular/common';
import { faBell, faUserCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgFor, FrontLinkComponent, FaIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faBell = faBell;
  faUserCircle = faUserCircle;
  faHeart = faHeart;

  menuActivate: string = 'Services';
  menus = HEADERMENUS;

  onClick(data: string): void {
    this.menuActivate = data;
  }


}
