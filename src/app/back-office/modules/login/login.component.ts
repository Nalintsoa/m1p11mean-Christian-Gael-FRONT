import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthApiService } from '../../service/auth-api.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  faUser = faUser;

  isLoading = false;

  constructor(
    public fb: FormBuilder,
    private authService: AuthApiService,
    private router: Router
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });

  handleSubmit = () => {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.staffLogin(this.loginForm.value).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.authService.setToken(res.token);
          if (res.staff.role === "employee") {
            this.router.navigate(['/back-office/profile']);
          } else {
            this.router.navigate(['/back-office/staff']);
          }
          this.isLoading = false;
        },
        error: (res) => {
          Swal.fire("Echec", "Mot de passe incorrect", "error");
          this.isLoading = false;
        }
      })
    }
  }
}
