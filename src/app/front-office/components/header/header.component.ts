import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FrontLinkComponent } from '../front-link/front-link.component';
import { HEADERMENUS } from '../../constants/links';
import { NgFor } from '@angular/common';
import { faBell, faUserCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CustomerServiceService } from '../../services/customer/customer-service.service';
import { NotificationsComponent } from '../../modules/notifications/notifications.component';
import { IService } from '../../../back-office/interfaces/serviceInterface';
import { SocketIoService } from '../../../services/socket-io.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    FrontLinkComponent,
    FaIconComponent,
    RouterLinkActive,
    NotificationsComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  faBell = faBell;
  faUserCircle = faUserCircle;
  faHeart = faHeart;

  show = false;
  service?: any;


  constructor(private customerService: CustomerServiceService, private router: Router, private socketService: SocketIoService) {
    this.socketService.listen("logged_in").subscribe((change) => {
      alert(`${change}`);
    })
  }


  ngOnInit(): void {
    this.checkTokenExpiration();
    this.socketService.listen("notifySpecialOffer").subscribe((data) => { console.log('okk', data); this.show = true; this.service = data })
  }

  menuActivate: string = 'Services';
  menus = HEADERMENUS;

  onShowNotifications() {
    this.show = !this.show;
  }

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
