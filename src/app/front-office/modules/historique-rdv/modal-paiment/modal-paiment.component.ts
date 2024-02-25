import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RdvService } from '../../../services/rdv/rdv.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-modal-paiment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-paiment.component.html',
  styleUrl: './modal-paiment.component.scss'
})
export class ModalPaimentComponent {
  @Input() customer: any = {};
  @Input() rdv: any = {};
  @Output() refresh = new EventEmitter()
  testRdv: any = {}

  submitted = false;

  @ViewChild("closeModal") elementRef?: ElementRef;

  paimentForm = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(1)])
  })

  constructor(private rdvService: RdvService, private router: Router) {

  };


  onConfirm() {
    this.submitted = true;
    const amount = this.paimentForm.get("amount")?.value;

    if (this.paimentForm.valid && amount) {
      this.submitted = false;
      if (this.customer?.solde < amount) {
        return Swal.fire({
          title: 'Paiement',
          icon: "error",
          text: "Désolé, vous n'avez pas assez de crédit pour pouvoir payer",
        });
      }
      if (Number(amount) > Number(this.rdv?.price - this.rdv?.amountPaid)) {
        console.log("Number(amount) > Number(this.rdv?.amountPaid)", Number(amount), " >", Number(this.rdv?.amountPaid), Number(amount) > Number(this.rdv?.amountPaid))
        return Swal.fire({
          title: 'Paiement',
          icon: "error",
          text: "Désolé, le montant que vous saisissez est bien supérieure à la reste à payer ",
        });
      }

      const dataToSend = {
        _id: this.rdv?._id,
        restSolde: Number(this.customer?.solde) - Number(amount),
        amountPaid: Number(this.rdv?.amountPaid) + Number(amount),
        paimentArray: [...this.rdv?.paimentArray, { date: new Date(), motif: "Paiement avant jour -j", amount }]
      }

      return this.onPayRdv(dataToSend);
    }


  }

  onPayRdv(data: any) {
    this.rdvService.payRdv(data).subscribe({
      next: () => {
        Swal.fire({
          title: "Paiement",
          text: "Votre paiment a été un succès",
          icon: "success"
        });

        this.refresh.emit();

        this.elementRef?.nativeElement.click();


      }

    })
  }


}
