import { Component, EventEmitter, Output } from '@angular/core';
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
  isClosed = false;
  submitted: boolean = false;
  @Output() reload = new EventEmitter<void>()

  constructor(public serviceService: ServiceService) { }

  defautValue = {
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    duration: new FormControl('', [Validators.required, Validators.min(15), Validators.max(120)]),
    commission: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('')
  }

  serviceForm = new FormGroup(this.defautValue);

  onSubmit() {
    // this.submitted = true;
    this.isClosed = false
    // if (this.serviceForm.valid) {
    //   const data: IService | any = this.serviceForm.value;
    //   this.serviceService.addService(data).subscribe(() => { this.isClosed = true; this.reload.emit() });
    // }

  }

}
