import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FrontLinkComponent } from '../front-link/front-link.component';
import { HEADERMENUS } from '../../constants/links';
import { NgFor } from '@angular/common';
import { faBell, faUserCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CustomerServiceService } from '../../services/customer/customer-service.service';
import { SocketIoService } from '../../../services/socket-io.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    FrontLinkComponent,
    FaIconComponent,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  faBell = faBell;
  faUserCircle = faUserCircle;
  faHeart = faHeart;

  constructor(private customerService: CustomerServiceService, private router: Router, private socketService: SocketIoService){
    this.socketService.listen("logged_in").subscribe((change) => {
      alert(`${change}`);
    })
  }

  ngOnInit(): void {
    this.checkTokenExpiration();
  }

  menuActivate: string = 'Services';
  menus = HEADERMENUS;

  onClick(data: string): void {
    this.menuActivate = data;
  }

  private checkTokenExpiration() {
    if (this.customerService.isTokenExpired()) {
      this.router.navigate(['/frontoffice']);
    } else {
      const token = this.customerService.getToken();
      this.customerService.saveToken(token);
    }
  }

  handleLogout = () => {
    this.customerService.logout().subscribe({
      next: (res) => {
        this.router.navigate(['/frontoffice']);
      }
    })
  }
}
