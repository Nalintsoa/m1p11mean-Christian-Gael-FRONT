import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../../services/service/service.service';
import { IService } from '../../../../interfaces/serviceInterface';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { EventBlockerDirective } from '../../../../../directives/event-blocker.directive';
import { UploadService } from '../../../../services/upload/upload.service';
import { WebsocketService } from '../../../../../common-service/websocket.service';

@Component({
  selector: 'app-service-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NgClass, EventBlockerDirective],
  templateUrl: './service-create.component.html',
  styleUrl: './service-create.component.scss'
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
    endOffer: ''
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
    category: new FormControl('Manucure')
  });

  file: File | null = null;
  imageURL: string | ArrayBuffer | null = null;

  categories = [
    'Manucure',
    'Pédicure',
    'Soin du visage',
    'Massothérapie'
  ];


  constructor(public serviceService: ServiceService, private uploadService: UploadService, private socketService: WebsocketService) { }

  ngOnInit() {
    this.serviceForm.get('specialOffer')?.valueChanges.subscribe((value) => {
      if (value) {
        this.serviceForm.get('startOffer')?.setValidators(Validators.required);
        this.serviceForm.get('endOffer')?.setValidators(Validators.required);
      } else {
        this.serviceForm.get('startOffer')?.clearValidators();
        this.serviceForm.get('endOffer')?.clearValidators();
      }
      this.serviceForm.get('startOffer')?.updateValueAndValidity();
      this.serviceForm.get('endOffer')?.updateValueAndValidity();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['mode']) {
      if (this.mode === "create") {
        this.serviceForm.setValue(this.defautValue);
        this.imageURL = '';

      } else {
        this._id = this.dataToUpdate._id;
        this.oldPrice = this.dataToUpdate.price;
        delete this.dataToUpdate.__v;
        delete this.dataToUpdate._id;
        this.serviceForm.setValue(this.dataToUpdate);
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

      if (this.serviceForm.get("specialOffer")?.value) {

        this.socketService.emit("specialOffer", { _id: this._id, oldPrice: this.oldPrice })
      }
    }

  };

  onCreate() {
    const data: IService | any = this.serviceForm.value;
    this.serviceService.addService(data).subscribe(() => {
      this.refresh();
    });

  }

  onUpdate() {
    const data: IService | any = this.serviceForm.value;
    this.serviceService.updateService({ ...data, _id: this._id }).subscribe(() => {
      this.refresh();
    });

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
