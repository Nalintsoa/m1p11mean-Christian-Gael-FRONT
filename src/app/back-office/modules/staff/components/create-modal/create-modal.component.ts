import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, TemplateRef, ViewChild, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StaffApiService } from '../../../../service/staff-api.service';
import { HttpClientModule } from '@angular/common/http';
import { IStaff } from '../../../../model/staff';
import { CREATION_MODE, EDIT_MODE } from '../../../../constant/enum';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.scss'
})
export class CreateModalComponent {
  faPlus = faPlus;
  submitted: boolean = false;
  private modalService = inject(NgbModal);

  constructor(
    public fb: FormBuilder,
    private staffService: StaffApiService,
  ) {}

  @ViewChild('closeModal')
  closeModalButton!: ElementRef;

  @ViewChild('openModal') openModalButton!: ElementRef;
  @ViewChild('content') modalContent!: TemplateRef<any>;

  @Input() mode: string = CREATION_MODE;
  @Input() data: IStaff = {} as IStaff;

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
    id: [''],
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
    { id: 'item1', label: 'Manucure', control: new FormControl(false) },
    { id: 'item2', label: 'Pédicure', control: new FormControl(false) },
    { id: 'item3', label: 'Soin du visage', control: new FormControl(false) },
    { id: 'item4', label: 'Massothérapie', control: new FormControl(false) },
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
      if (this.mode === EDIT_MODE && this.staffForm.get('id')?.value !== '') {
        return this.staffService.updateStaff(this.staffForm.value).subscribe({
          next: (res) => {
            this.staffForm.reset();
            this.submitted = false;
            this.closeModal();
          },
          error: (e) => {
            console.log(e);
          },
        })
      }
      return this.staffService.createStaff(this.staffForm.value).subscribe({
        next: (res) => {
          this.staffForm.reset();
          this.submitted = false;
          this.closeModal();
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

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

  openModal = () => {
    this.mode = CREATION_MODE;
    this.open(this.modalContent);
  }

  closeModal = () => {
    this.staffForm.reset();
    this.mode = CREATION_MODE;
    this.modalService.dismissAll();
  }

  handleDelete = () => {
    return this.staffService.deleteStaff(this.staffForm.value).subscribe({
      next: (res) => {
        this.staffForm.reset();
        this.submitted = false;
        this.closeModal();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
