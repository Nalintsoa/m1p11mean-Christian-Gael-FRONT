import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffApiService } from '../../../../service/staff-api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss'
})
export class CreateModalComponent {
  faPlus = faPlus;
  submitted: boolean = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private staffService: StaffApiService,
  ) {}

  @ViewChild('closeModal')
  closeModalButton!: ElementRef;

  staffForm = this.fb.group({
    name: ['', [Validators.required]],
    firstName: [''],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    cinNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    careerStart: ['', [Validators.required]],
    startHour: ['', [Validators.required]],
    endHour: ['', [Validators.required]],
    skills: ['', [Validators.required]],
    speciality: ['', [Validators.required]],
  });

  validationMessage = {
    name: {
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
    cinNumber: {
      required: 'Veuillez remplir ce champ',
      pattern: 'Le champ doit contenir uniquement des chiffres.',
    },
    careerStart: {
      required: 'Veuillez remplir ce champ',
    },
    startHour: {
      required: 'Veuillez remplir ce champ',
    },
    endHour: {
      required: 'Veuillez remplir ce champ',
    },
    skills: {
      required: 'Veuillez remplir ce champ',
    },
    speciality: {
      required: 'Veuillez remplir ce champ',
    },
  };
  

  // for the select
  items = [
    { id: 'item1', label: 'Élément 1', control: new FormControl(false) },
    { id: 'item2', label: 'Élément 2', control: new FormControl(false) },
    { id: 'item3', label: 'Élément 3', control: new FormControl(false) },
  ];

  result = '';
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  updateSelection() {
    this.result = this.items
      .filter((item) => item.control.value)
      .map((item) => item.label)
      .join(', ');

    this.staffForm.patchValue({ skills: this.result });
  }
  // select

  handleClickAddButton = () => {
    this.staffForm.reset();
    this.submitted = false;
  }

  handleSubmit = () => {
    this.submitted = true;
    if (!this.staffForm.valid){
      return;
    } else {
      return this.staffService.createStaff(this.staffForm.value).subscribe({
        next: (res) => {
          this.staffForm.reset();
          this.submitted = false;
          this.closeModalButton.nativeElement.click();
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
