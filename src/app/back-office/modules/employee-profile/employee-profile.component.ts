import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faKey, faMailBulk, faPenSquare, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent {
  faPenSquare = faPenSquare;
  faPhone = faPhone;
  faMail = faMailBulk;
  faPassword = faKey;
}
