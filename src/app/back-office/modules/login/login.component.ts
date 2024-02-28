import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthApiService } from '../../service/auth-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  faUser = faUser;

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
      this.authService.staffLogin(this.loginForm.value).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/back-office/profile']);
        },
        error: (res) => {
          Swal.fire("Echec", "Mot de passe incorrect", "error");
          console.log(res);
        }
      })
    }
  }
}
