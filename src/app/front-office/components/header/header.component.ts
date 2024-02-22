import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FrontLinkComponent } from '../front-link/front-link.component';
import { HEADERMENUS } from '../../constants/links';
import { CommonModule, NgFor } from '@angular/common';
import { faBell, faUserCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CustomerServiceService } from '../../services/customer/customer-service.service';
import { NotificationsComponent } from '../../modules/notifications/notifications.component';
import { SocketIoService } from '../../../services/socket-io.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
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
  activeNotif = false;

  show = false;
  services?: any = [];


  menuActivate: string = 'Services';
  menus = HEADERMENUS;


  constructor(
    private customerService: CustomerServiceService,
    private router: Router,
    private socketService: SocketIoService,
    private elementRef: ElementRef
  ) {
    this.socketService.listen("logged_in").subscribe((change) => {
      alert(`${change}`);
    })
    this.socketService.emit("getNotifications", true);
    this.socketService.listen("notifySpecialOffer").subscribe((data) => { this.show = true; this.services = data; this.activeNotif = true; })

  }


  ngOnInit(): void {
    this.checkTokenExpiration();
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.show = false;
      this.activeNotif = false;
    }
  }

  onShowNotifications() {
    this.activeNotif = !this.activeNotif;
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
