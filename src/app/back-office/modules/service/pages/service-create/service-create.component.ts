import { Component, ElementRef, EventEmitter, Input, NgZone, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../../services/service/service.service';
import { IService } from '../../../../interfaces/serviceInterface';
import { CommonModule, DatePipe } from '@angular/common';
import { EventBlockerDirective } from '../../../../../directives/event-blocker.directive';
import { UploadService } from '../../../../services/upload/upload.service';
import { SocketIoService } from '../../../../../services/socket-io.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, EventBlockerDirective],
  templateUrl: './service-create.component.html',
  styleUrl: './service-create.component.scss',
  providers: [DatePipe]
})
export class ServiceCreateComponent {
  @Input() mode?: string;
  @Input() dataToUpdate?: IService | any;
  @Output() close = new EventEmitter<void>();
  @Output() reload = new EventEmitter<void>();
  @ViewChild('closeModal') closeModal?: ElementRef;
  submitted: boolean = false;
  _id?: string;
  oldPrice?: number;

  defautValue: IService | any = {
    name: '',
    price: '',
    duration: '',
    commission: '',
    path: '',
    category: 'Manucure',
    specialOffer: false,
    startOffer: '',
    endOffer: '',
    priceOffer: ''
  }

  serviceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    duration: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    commission: new FormControl('', [Validators.required, Validators.min(1)]),
    path: new FormControl('', [Validators.required]),
    specialOffer: new FormControl(false),
    startOffer: new FormControl(),
    endOffer: new FormControl(),
    category: new FormControl('', [Validators.required]),
    priceOffer: new FormControl(''),
  });

  file: File | null = null;
  imageURL: string | ArrayBuffer | null = null;

  categories = [
    'Manucure',
    'Pédicure',
    'Soin du visage',
    'Massothérapie'
  ];


  constructor(
    public serviceService: ServiceService,
    private uploadService: UploadService,
    private datePipe: DatePipe,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.serviceForm.get('specialOffer')?.valueChanges.subscribe((value) => {
      if (value) {
        this.serviceForm.get('startOffer')?.setValidators(Validators.required);
        this.serviceForm.get('endOffer')?.setValidators(Validators.required);
        this.serviceForm.get('priceOffer')?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        this.serviceForm.get('startOffer')?.clearValidators();
        this.serviceForm.get('endOffer')?.clearValidators();
        this.serviceForm.get('priceOffer')?.clearValidators();
      }
      this.serviceForm.get('startOffer')?.updateValueAndValidity();
      this.serviceForm.get('endOffer')?.updateValueAndValidity();
      this.serviceForm.get('priceOffer')?.updateValueAndValidity();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['mode']) {
      if (this.mode === "create") {
        this.serviceForm.setValue(this.defautValue);
        this.imageURL = '';

      } else {
        this._id = this.dataToUpdate._id;
        if (!!this.dataToUpdate.startOffer && !!this.dataToUpdate.endOffer) {
          this.dataToUpdate.startOffer = this.datePipe.transform(this.dataToUpdate.startOffer, "yyyy-MM-dd");
          this.dataToUpdate.endOffer = this.datePipe.transform(this.dataToUpdate.endOffer, "yyyy-MM-dd");
        }
        const dataForm = { ...this.dataToUpdate };
        delete dataForm.__v;
        delete dataForm._id;
        this.serviceForm.setValue(dataForm);
        this.imageURL = `http://localhost:8000/${this.dataToUpdate.path}`
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.serviceForm.value)
    if (this.serviceForm.valid) {
      if (this.mode === "create") {
        this.onCreate();
      } else {
        this.onUpdate();
      }
    }

  };

  onCreate() {
    const data: IService | any = this.serviceForm.value;
    this.serviceService.addService(data).subscribe(() => {
      Swal.fire("Enregistré!", "Service enregistré avec succès", "success");
      this.refresh();
    });

  }

  onUpdate() {
    const data: IService | any = this.serviceForm.value;
    this.zone.run(() =>
      this.serviceService.updateService({ ...data, _id: this._id }).subscribe(() => {
        Swal.fire("Enregistré!", "Service  mis à jour avec succès", "success");
        this.refresh();
      }));
  }

  onClose() {
    this.close.emit();
  }

  refresh() {
    this.reload.emit();
    this.closeModal?.nativeElement.click();
    this.submitted = false;
  }

  onDrop(event: Event) {
    this.file = (event as DragEvent).dataTransfer?.files[0] ?? null;

    if (this.file && this.file.type.startsWith('image/')) {
      const formData = new FormData()
      formData.append('file', this.file);

      const fileToRender = this.file
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result;
      };
      reader.readAsDataURL(fileToRender);

      this.uploadService.uploadFile(formData).subscribe((data: any) => this.serviceForm.get('path')?.setValue(data?.path))
    }


  }

  testSwitch(e: any) {
    console.log(e)
  }


}
