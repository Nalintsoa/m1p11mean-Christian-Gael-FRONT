import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomerServiceService } from '../../services/customer/customer-service.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  isLoginFormSubmitted = false;
  step = 1;
  constructor(private formBuilder: FormBuilder, private customerService: CustomerServiceService, private router: Router){

  }

  forgetPasswordForm = this.formBuilder.group({
    identifier: ['', [Validators.required, Validators.email]],
    password: [''],
  })

  secondStepForm = this.formBuilder.group({
    password: [''],
  });

  finalStepForm = this.formBuilder.group({
    tempPassword: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  customerEmail = "";
  onSubmit(){
    this.isLoginFormSubmitted = true;
    if (!this.forgetPasswordForm.valid) {
      return;
    }
    this.customerService.forgetPassword(this.forgetPasswordForm.get('identifier')?.value || "").subscribe({
      next: (res) => {
        this.step = 2;
        this.isLoginFormSubmitted = false;
        this.customerEmail = res.email;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  onSubmitSecondStep(){
    this.customerService.checkTemporaryPassword(this.customerEmail, this.secondStepForm.get('password')?.value || "").subscribe({
      next: (res) => {
        this.step = 3;
      }
    })
  }

  onSubmitFinalStep() {
    if (this.finalStepForm.valid) {
      if (this.finalStepForm.get('tempPassword')?.value === this.finalStepForm.get("password")?.value){
        this.customerService.updateCustomerPassword(this.customerEmail, this.finalStepForm.get('password')?.value || "").subscribe({
          next: (res) => {
            this.router.navigate(['/frontoffice']);
          }
        })
      }
    }
  }
}
