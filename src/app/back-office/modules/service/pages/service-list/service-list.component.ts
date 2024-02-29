import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '../../../../common/breadcrumb/breadcrumb.component';
import { INavigationItem } from '../../../../interfaces/breadCrumbInterfaces';
import { PATH_BACKOFFICE } from '../../../../routes/back-office-route';
import { faPlus, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ServiceCreateComponent } from '../service-create/service-create.component';
import { ServiceService } from '../../../../services/service/service.service';
import { IService } from '../../../../interfaces/serviceInterface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FontAwesomeModule,
    CommonModule,
    ServiceCreateComponent,
    NgFor,
    NgIf
  ],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.scss',
})
export class ServiceListComponent {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  @ViewChild('openModal') openModal?: ElementRef;

  mode = 'create';
  dataToUpdate?: IService;

  pathsArray: INavigationItem[] = [
    {
      label: 'Service',
      path: `${PATH_BACKOFFICE}/service`,
    },
    {
      label: 'Liste',
    },
  ];

  services: IService[] = []

  constructor(public serviceService: ServiceService) { }

  ngOnInit() {
    this.getServices();
  }

  onCloseModal() {
    this.mode = "create";
  }

  getServices() {
    this.services = [];
    this.serviceService.getServices().subscribe(data => { this.mode = "create"; this.services = data; });
  };

  getService(data: IService) {
    this.mode = "update";
    this.dataToUpdate = data;
    this.openModal?.nativeElement.click();
  }

  onDelete(service: any) {
    const _id = service._id
    if (_id) {
      Swal.fire({
        title: "Suppression",
        text: "Êtes-vous sûre de vouloir supprimer ce service?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmer",
        cancelButtonText: "Annuler"
      }).then((result) => {
        if (result.isConfirmed) {
          this.serviceService.deleteService(_id).subscribe({
            next: (data) => {
              Swal.fire("Suppression", "Suppression du service avec succès", "success");
              this.getServices();
            },
            error: (res: any) => {
              Swal.fire("Suppression", `${res?.error?.message}`, "error");
            }
          })
        }
      });

    }

  }
}
