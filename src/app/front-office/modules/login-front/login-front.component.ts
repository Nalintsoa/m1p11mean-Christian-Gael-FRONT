import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-front',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-front.component.html',
  styleUrl: './login-front.component.scss'
})
export class LoginFrontComponent {
  isLoginForm = true;
  firstRegisterForm = true;

  constructor(public fb: FormBuilder){}

  registerForm = this.fb.group({
    pseudo: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
    tempPassword: ['', Validators.required],
    password: ['', [Validators.required]]
  });

  loginForm = this.fb.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  toggleLoginOrRegister(){
    this.isLoginForm = !this.isLoginForm;
    this.firstRegisterForm =true;
  }

  handleClickContinue = () => {
    if (!this.isLoginForm && this.firstRegisterForm) {
      this.firstRegisterForm = false;
    } else {
      this.firstRegisterForm = true;
    }
  }

  handleLoginSubmit = () => {
    console.log(this.loginForm.value);
  }

  handleRegisterSubmit = () => {
    console.log(this.registerForm.value);
  }
}
