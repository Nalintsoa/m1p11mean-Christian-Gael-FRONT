import { Component, ElementRef, HostListener, NgZone, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FrontLinkComponent } from '../front-link/front-link.component';
import { HEADERMENUS } from '../../constants/links';
import { CommonModule, NgFor } from '@angular/common';
import { faBell, faUserCircle, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CustomerServiceService } from '../../services/customer/customer-service.service';
import { NotificationsComponent } from '../../modules/notifications/notifications.component';
import { SocketIoService } from '../../../services/socket-io.service';
import { ServiceService } from '../../../back-office/services/service/service.service';

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

  activeFirst = false;


  constructor(
    private customerService: CustomerServiceService,
    private router: Router,
    private socketService: SocketIoService,
    private elementRef: ElementRef,
    private zone: NgZone,
    private serviceService: ServiceService
  ) {

  }

  ngOnInit(): void {
    this.checkTokenExpiration();
    this.getNotifications();
    this.setupSocketListeners();
  }

  private setupSocketListeners() {

    this.socketService.listen("notifySpecialOffer").subscribe((data) => {
      this.zone.run(() => {
        this.activeNotif = true;
        this.show = true;
        this.services = data;
        this.activeNotif = true;
        this.activeFirst = true;
      });
    });

    // this.socketService.listen("logged_in").subscribe((change) => {
    //   alert(`${change}`);
    // })

  }


  @HostListener('document:click', ['$event.target'])
  onClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (this.elementRef.nativeElement instanceof Node && targetElement instanceof Node) {
      if (!this.elementRef.nativeElement.contains(targetElement)) {
        this.show = false;
        this.activeNotif = false;
      }

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

  getNotifications() {
    this.serviceService.getNotificationOffer().subscribe(data => {
      this.services = data
      this.services = data;
    })
  }

  onView() {
    this.activeFirst = false;
  }
}
