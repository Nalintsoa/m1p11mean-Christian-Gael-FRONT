import { CommonModule, formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BREADCRUMBS } from '../../constants/breadCrumbs';
import { IService } from '../../../back-office/interfaces/serviceInterface';
import { ServiceService } from '../../../back-office/services/service/service.service';
import { RdvService } from '../../services/rdv/rdv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardServiceComponent } from './card-service/card-service.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faBellSlash, faClock, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { ConfirmRdvComponent } from './confirm-rdv/confirm-rdv.component';
import Swal from 'sweetalert2';
import { CustomerServiceService } from '../../services/customer/customer-service.service';
import { jwtDecode } from 'jwt-decode';
import { AuthApiService } from '../../../back-office/service/auth-api.service';

@Component({
  selector: 'app-create-rdv',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    CardServiceComponent,
    FontAwesomeModule,
    ConfirmRdvComponent
  ],
  templateUrl: './create-rdv.component.html',
  styleUrl: './create-rdv.component.scss'
})
export class CreateRdvComponent {
  faBell = faBell;
  menu = BREADCRUMBS[1];

  filterData: { date: string, category: string } = { date: '', category: '' };

  formattedArray: any = [];

  services: IService[] = [];

  serviceSelected?: IService;

  errorMessage?: string;
  successMessage?: string;

  columnToColor: any = [];

  dataToSend: any = {};

  addRappel = false;

  todayDate = this.getFormatDate(new Date());

  idCustomer = '';


  customer: any = {};


  constructor(
    private serviceService: ServiceService,
    public rdvService: RdvService,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerServiceService,
    private authService: AuthApiService
  ) {
    this.getCustomerId();
    this.getInfoCustomer();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.getOneService(id);
  }

  getCells(row: any): any[] {
    return Object.values(row);
  }

  getFormatDate(date: Date | string) {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  onClickCell = (rowNumber: number, columnNumber: number, item: any) => {
    const duration = Number(this.serviceSelected?.duration);
    const row = this.getCells(this.formattedArray[rowNumber]);
    const startHour = item.value;
    const endHour = startHour + duration;
    this.errorMessage = undefined;
    const tempColor = [];;

    for (let i = columnNumber; i < columnNumber + duration; i++) {
      tempColor.push({ row: rowNumber, column: i });
      if (row[i].dispo === false) {
        this.columnToColor = [];
        this.errorMessage = "Impossible de réserver";
        return;
      }
    }

    this.reinitColorCell(rowNumber);

    this.columnToColor = tempColor;

    this.onColorCell(rowNumber);
    let price = this.serviceSelected?.price;
    let specialOffer = false;
    let amountPaid;

    if (this.serviceSelected?.endOffer && this.serviceSelected?.startOffer) {
      const isTodayBetweenStartAndEnd =
        new Date(this.todayDate) <= new Date(this.serviceSelected?.endOffer)
        &&
        new Date(this.todayDate) >= new Date(this.serviceSelected?.startOffer);
      if (isTodayBetweenStartAndEnd) {
        price = this.serviceSelected?.priceOffer;
        specialOffer = true;
      }
    }

    price && (amountPaid = price / 100 * 30)

    this.dataToSend = {
      ...this.dataToSend,
      service: this.serviceSelected?._id,
      commission: this.serviceSelected?.commission,
      startHour,
      endHour,
      employee: item?._id,
      date: this.filterData.date,
      specialOffer,
      price,
      amountPaid,
      paimentArray: [{ date: new Date(), amount: amountPaid, motif: 'Confirmation du rendez-vous' }],
      restSolde: Number(this.customer?.solde) - Number(amountPaid),
    }

  }

  onColorCell(row: number) {
    for (let j = 0; j < this.columnToColor.length; j++) {
      this.formattedArray[this.columnToColor[j].row][this.columnToColor[j].column + 7] = { ...this.formattedArray[row][this.columnToColor[j] + 7], statusTemp: true }
    }
  }

  reinitColorCell(row: number) {
    for (let j = 0; j < this.columnToColor.length; j++) {
      delete this.formattedArray[this.columnToColor[j].row][this.columnToColor[j].column + 7].statusTemp

    }

    this.columnToColor = [];
  }

  onCheckDispo(event: any) {

    const { name, value } = event.target;

    this.filterData = { ...this.filterData, [name]: value }


    if (this.filterData.date !== "" && this.serviceSelected)
      this.rdvService.checkDisponibility({ ...this.filterData, category: this.serviceSelected?.category }).subscribe((data) => this.formattedArray = data)

  }

  onConfimRdv() {
    if (Object.values(this.dataToSend).length) {

      Swal.fire({
        title: "Confirmation",
        text: `Pour pouvoir confirmer votre rendez-vous, 30% (${this.dataToSend?.amountPaid}Ar) du prix du service seraient
        décompté de votre Crédit actuel`,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Annuler le rendez-vous",
        confirmButtonText: "Confirmer",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.dataToSend?.amountPaid > this.customer?.solde) {
            Swal.fire({
              title: "Confirmation",
              text: "Désolé, vous n'avez pas assez de crédit pour payer",
              icon: "error"
            });
          }
          else {
            Swal.showLoading();
            this.onCreateRdv()
          }
        } else {
          this.onCancelRdv();
        }
      });
    }
    else {
      this.errorMessage = "Veuillez remplir tous les champs"
    }
  }

  getResponse(response: boolean) {
    if (response)
      this.onCreateRdv();
    else
      this.onCancelRdv();

  }

  onCreateRdv() {
    this.errorMessage = undefined;
    this.rdvService.addRdv(this.dataToSend).subscribe((data) => {
      // Swal.close();
      Swal.fire({
        title: "Confirmation",
        text: "Votre rendez-vous a été enregistré avec succès",
        icon: "success"
      }).then(result => {
        if (result.isConfirmed) {
          this.router.navigate(['front-office/histo-rdv'])
        }
      });
      // this.router.navigate(['front-office/histo-rdv'])

      // setTimeout(() => {
      //   this.filterData = { date: '', category: '' };
      //   this.dataToSend = {};
      //   this.successMessage = "Rendez-vous créé avec succès";
      //   this.rdvService.isLoading = false;
      //   this.successMessage = undefined;
      //   this.router.navigate(['front-office/histo-rdv'])
      // }, 3000);

    })
  }

  onCancelRdv() {
    this.dataToSend = {};
    this.successMessage = undefined;
    this.router.navigate(['front-office/services'])
  }

  getOneService(id: string) {
    this.serviceService.getOneService(id).subscribe((data) => this.serviceSelected = data)
  }

  handleAddRappel() {
    this.addRappel = true;
  }

  handleChangeRappel(event: any) {
    this.dataToSend = {
      ...this.dataToSend,
      rappel: event.target.value
    }
  }

  getInfoCustomer() {

    this.customerService.getCustomer(this.idCustomer).subscribe(data => {
      this.customer = data;
    })
  }

  getCustomerId() {
    const jwtToken = this.authService.getToken();
    if (jwtToken) {
      const decodeToken: any = jwtDecode(jwtToken);
      if (decodeToken._id) {
        this.idCustomer = decodeToken._id;
      }
    }
  }

}

