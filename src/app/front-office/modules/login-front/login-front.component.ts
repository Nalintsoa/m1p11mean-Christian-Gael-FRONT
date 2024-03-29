import { CommonModule } from '@angular/common';
import { Component, ElementRef, TemplateRef, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faBackspace } from '@fortawesome/free-solid-svg-icons';
import { CustomerServiceService } from '../../services/customer/customer-service.service';
import { Router, RouterModule } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthApiService } from '../../../back-office/service/auth-api.service';

@Component({
  selector: 'app-login-front',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './login-front.component.html',
  styleUrl: './login-front.component.scss',
})
export class LoginFrontComponent {
  faBack = faArrowLeft;
  isLoginForm = true;
  firstRegisterForm = true;

  isLoginFormSubmitted = false;

  isLoading = false;

  constructor(public fb: FormBuilder, private customerService: CustomerServiceService, private router: Router, private authService: AuthApiService) { }

  registerForm = this.fb.group({
    pseudo: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    tempPassword: ['', Validators.required],
    password: ['', [Validators.required]],
  });

  validationMessage = {
    pseudo: {
      required: 'Veuillez remplir ce champ',
    },
    phoneNumber: {
      required: 'Veuillez remplir ce champ',
      pattern: 'Le numéro de téléphone doit être composé de chiffres uniquement.',
      minLength: 'Le numéro de téléphone doit avoir au moins 10 chiffres.',
      maxLength: 'Le numéro de téléphone ne doit pas dépasser 10 chiffres.',
    },
    email: {
      required: 'Veuillez remplir ce champ',
      email: 'Veuillez entrer une adresse e-mail valide.',
    },
    address: {
      required: 'Veuillez remplir ce champ',
    },
  };

  loginForm = this.fb.group({
    identifier: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  rdvToRemind: any[] = [];

  isFirstStepRegisterValid = () => {
    return (
      !this.registerForm.get('pseudo')?.hasError('required') &&
      !this.registerForm.get('email')?.hasError('required') &&
      !this.registerForm.get('email')?.hasError('email') &&
      !this.registerForm.get('address')?.hasError('required') &&
      !this.registerForm.get('phoneNumber')?.hasError('required') &&
      !this.registerForm.get('phoneNumber')?.hasError('pattern') &&
      !this.registerForm.get('phoneNumber')?.hasError('minLength') &&
      !this.registerForm.get('phoneNumber')?.hasError('maxLength')
    );
  };

  toggleLoginOrRegister() {
    this.isLoginForm = !this.isLoginForm;
    this.firstRegisterForm = true;
    this.registerForm.reset();
    this.loginForm.reset();
    this.isLoginFormSubmitted = false;
  }

  handleClickReturn() {
    this.isLoginForm = false;
    this.firstRegisterForm = true;
  }

  handleClickContinue = () => {
    if (!this.isLoginForm && this.firstRegisterForm) {
      this.firstRegisterForm = false;
    } else {
      this.firstRegisterForm = true;
    }
  };

  handleLoginSubmit = () => {
    this.isLoginFormSubmitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      const data = {
        email: this.loginForm.get('identifier')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.customerService.customerLogin(data).subscribe({
        next: (res) => {
          this.customerService.saveToken(res.token);
          this.authService.setToken(res.token);
          console.log(res);
          this.openAlertModal(res.alertArray || []);
          this.router.navigate(['/front-office']);
          this.isLoginFormSubmitted = true;
          this.isLoading = false;
        },
        error: (err) => {
          Swal.fire("Echec!", "Mot de passe est incorrect", "error");
          this.isLoading = false;
        }
      })
    }
  };

  handleRegisterSubmit = () => {
    if (this.registerForm.valid) {
      if (this.registerForm.get('tempPassword')?.value === this.registerForm.get("password")?.value) {
        this.customerService.register(this.registerForm.value).subscribe({
          next: (res) => {
            this.loginForm.reset();
            this.isLoginForm = true;
            this.firstRegisterForm = true;
          },
          error(err) {
            console.log(err);
          },
        })
      }
    }
  };

  @ViewChild('content') modal!: ElementRef;
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  openAlertModal(alertArray: any[]) {
    if (alertArray.length > 0) {
      this.rdvToRemind = alertArray;
      this.modalService.open(this.modal, { backdrop: 'static', keyboard: false });
    }
  }

  handleRedirectToHistory() {
    this.router.navigate(["/front-office/histo-rdv"]);
    this.modalService.dismissAll();
  }
}
