import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../../services/service/service.service';
import { IService } from '../../../../interfaces/serviceInterface';
import { NgClass, NgIf } from '@angular/common';
import { EventBlockerDirective } from '../../../../../directives/event-blocker.directive';
import { UploadService } from '../../../../services/upload/upload.service';

@Component({
  selector: 'app-service-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, EventBlockerDirective],
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

  defautValue: IService | any = {
    name: '',
    price: '',
    duration: '',
    commission: '',
    description: '',
    path: ''
  }

  serviceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    duration: new FormControl('', [Validators.required, Validators.min(15), Validators.max(120)]),
    commission: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl(''),
    path: new FormControl('', [Validators.required])
  });

  file: File | null = null;
  imageURL: string | ArrayBuffer | null = null;

  constructor(public serviceService: ServiceService, private uploadService: UploadService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['mode']) {
      if (this.mode === "create") {
        this.serviceForm.setValue(this.defautValue);
        this.imageURL = '';

      } else {
        this._id = this.dataToUpdate._id;
        delete this.dataToUpdate.__v;
        delete this.dataToUpdate._id;
        this.serviceForm.setValue(this.dataToUpdate);
        this.imageURL = `http://localhost:8081/${this.dataToUpdate.path}`
      }
    }
  }

  onSubmit() {
    this.submitted = true;
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


}
