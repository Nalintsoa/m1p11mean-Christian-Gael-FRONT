import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../../services/service/service.service';
import { IService } from '../../../../interfaces/serviceInterface';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-service-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
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
    description: ''
  }

  serviceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    duration: new FormControl('', [Validators.required, Validators.min(15), Validators.max(120)]),
    commission: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('')
  });

  constructor(public serviceService: ServiceService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['mode']) {
      if (this.mode === "create") {
        this.serviceForm.setValue(this.defautValue);
      } else {
        this._id = this.dataToUpdate._id;
        delete this.dataToUpdate.__v;
        delete this.dataToUpdate._id;
        this.serviceForm.setValue(this.dataToUpdate)
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

}
