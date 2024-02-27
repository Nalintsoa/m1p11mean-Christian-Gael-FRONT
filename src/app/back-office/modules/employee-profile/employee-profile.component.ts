import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faKey, faMailBulk, faPenSquare, faPhone, faSave } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService } from '../../service/auth-api.service';
import { jwtDecode } from 'jwt-decode';
import { StaffApiService } from '../../service/staff-api.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IStaff } from '../../model/staff';
import { CommonModule, formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { UploadService } from '../../services/upload/upload.service';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent {
  faPenSquare = faPenSquare;
  faPhone = faPhone;
  faMail = faMailBulk;
  faPassword = faKey;
  faSave = faSave;
  submitted: boolean = false;

  EMPLOYEE_INFO = {} as IStaff;



  @ViewChild("btnUpload") btnUpload?: ElementRef;

  imageURL: any;
  constructor(public fb: FormBuilder, private authApiService: AuthApiService, private staffApiService: StaffApiService,
    private uploadService: UploadService) {
    this.getInfoEmployee();
  }

  staffForm = this.fb.group({
    name: ['', [Validators.required]],
    firstName: [''],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    cinNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    careerStart: ['', [Validators.required]],
    startHour: ['', [Validators.required]],
    endHour: ['', [Validators.required]],
    speciality: ['', [Validators.required]],
    id: [''],
    password: [''],
    path: ['']
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
    speciality: {
      required: 'Veuillez remplir ce champ',
    },
  };

  items = [
    { id: 'item1', label: 'Manucure', control: new FormControl(false) },
    { id: 'item2', label: 'Pédicure', control: new FormControl(false) },
    { id: 'item3', label: 'Soin du visage', control: new FormControl(false) },
    { id: 'item4', label: 'Massothérapie', control: new FormControl(false) },
  ];

  imgPath?: string;

  handleChangeHour = (e: any) => {
    const { name, value } = e.target;
    const hours = value.split(":");
    if (name === 'endHour') {
      const startHour = this.staffForm.get('startHour')?.value || "";
      if (startHour !== undefined && startHour !== "") {
        if (+hours[0] <= +startHour.split(":")[0]) {
          this.staffForm.patchValue({ [name]: undefined });
          alert('La date de fin doit être supérieure à la date de début');
          return;
        }
      }
    }

    if (name === 'startHour') {
      const endHour = this.staffForm.get('endHour')?.value || "";
      if (endHour !== undefined && endHour !== "") {
        if (+hours[0] >= +endHour.split(":")[0]) {
          this.staffForm.patchValue({ [name]: undefined });
          alert('La date de fin doit être supérieure à la date de début');
          return
        }
      }
    }

    if (+hours[0] > 17 || +hours[0] < 8) {
      this.staffForm.patchValue({ [name]: undefined });
      alert('Heure d\'ouverture du salon : 08:00 à 17:00');
      return;
    }
    this.staffForm.patchValue({ [name]: `${hours[0]}:00` });
  }

  handleClickImg() {
    this.btnUpload?.nativeElement.click();
  }

  handleUpload(e: any) {
    console.log(e)
    const file = e.target?.files[0] ?? null;

    if (file && file.type.startsWith('image/')) {
      const formData = new FormData()
      formData.append('file', file);
      this.uploadService.uploadFile(formData).subscribe((data: any) => {
        this.staffForm.get('path')?.setValue(data?.path);
        this.imgPath = `http://localhost:8000/${this.staffForm.get('path')?.value}`

      })
    }
  }

  getInfoEmployee() {
    const jwt_token = this.authApiService.getToken();
    if (jwt_token) {
      const decodedToken: any = jwtDecode(jwt_token);
      if (decodedToken._id) {
        this.staffApiService.getStaff(decodedToken._id).subscribe({
          next: (res) => {
            this.EMPLOYEE_INFO = res;

            this.staffForm.setValue({
              careerStart: formatDate(res.careerStart, 'yyyy-MM-dd', 'en-US'),
              cinNumber: `${res.cinNumber}`,
              email: res.email,
              endHour: res.endHour,
              firstName: res.firstName,
              name: res.name,
              phoneNumber: res.phoneNumber ? `${res.phoneNumber}` : '',
              speciality: res.speciality,
              startHour: res.startHour,
              id: res._id,
              password: null,
              path: res.path || ''
            });

            this.imgPath = `http://localhost:8000/${this.staffForm.get('path')?.value}`
          },
        })
      }
    }
  }

  // modifyPassword = false;
  // handleToggleModifyPassword(){
  //   if (this.modifyPassword === true) {

  //   }
  //   this.modifyPassword = !this.modifyPassword;
  // }

  handleSubmit() {
    this.submitted = true;
    if (!this.staffForm.valid) {
      return;
    } else {
      return this.staffApiService.updateStaff(this.staffForm.value).subscribe({
        next: (res) => {
          Swal.fire("Enregistré", "Modification du profil enregistrée avec succès", "success")
          this.submitted = false;
          this.EMPLOYEE_INFO = res as IStaff
        },
        error: (e) => {
          console.log(e);
        },
      })
    }
  }
}
