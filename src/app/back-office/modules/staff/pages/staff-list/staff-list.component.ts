import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../../../common/navbar/navbar.component';
import { BreadcrumbComponent } from '../../../../common/breadcrumb/breadcrumb.component';
import { INavigationItem } from '../../../../interfaces/breadCrumbInterfaces';
import { PATH_BACKOFFICE } from '../../../../routes/back-office-route';
import { CreateModalComponent } from '../../components/create-modal/create-modal.component';
import { StaffApiService } from '../../../../service/staff-api.service';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CREATION_MODE, EDIT_MODE } from '../../../../constant/enum';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [NavbarComponent, BreadcrumbComponent, CreateModalComponent, CommonModule, FormsModule],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.scss'
})
export class StaffListComponent {
  searchQuery = "";
  arrayData: any = [];
  listToShow: any = [];
  dataCount = this.listToShow.length;

  modalMode = CREATION_MODE;
  modalData: any = {};

  @ViewChild(CreateModalComponent)
  private modalComponent!: CreateModalComponent;
  isLoading = false;

  arrayColumns = [
    {
      title: 'Nom',
      data: 'name',
    },
    {
      title: 'Prénoms',
      data: 'firstName',
    },
    {
      title: 'email',
      data: 'email',
    },
  ];

  pathsArray: INavigationItem[] = [
    {
      label: 'Gestion de personnel',
      path: `${PATH_BACKOFFICE}/staff`
    },
    {
      label: 'Liste',
    }
  ];

  constructor(private staffApiService: StaffApiService) {
    this.getAllStaffs();

    this.staffApiService.RefreshRequired.subscribe(result => {
      this.getAllStaffs();
    })
  }

  getAllStaffs() {
    this.isLoading = true;
    this.staffApiService.getStaffList().subscribe((data) => {
      this.isLoading = false;
      this.listToShow = data;
      this.dataCount = this.listToShow.length
      this.loadData();
    })
  };

  // ACTION ON THE TABLE
  handleSearchChange = () => {
    this.staffApiService.getStaffList().subscribe({
      next: (res: any) => {
        const tempArray = res.filter((item: any) => {
          return Object.values(item).toString().toLowerCase().includes(this.searchQuery.toLowerCase());
        });
        this.listToShow = tempArray;
        this.dataCount = this.listToShow.length
      }
    })
  }

  queriedList = async () => {
    const tempArray = this.listToShow.filter((item: any) => {
      return Object.values(item).toString().toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  data = this.queriedList();

  loadData() {
    this.data = this.queriedList();
  }

  // END OF ACTION ON THE TABLE

  handleClickRow = (row: any) => {
    this.modalData = row;
    this.modalMode = EDIT_MODE;

    this.modalComponent.openModal();
    this.modalComponent.mode = EDIT_MODE;
    this.modalComponent.changePassword = false;

    this.modalComponent.staffForm.setValue({
      careerStart: formatDate(this.modalData.careerStart, 'yyyy-MM-dd', 'en-US'),
      cinNumber: `${this.modalData.cinNumber}`,
      email: this.modalData.email,
      endHour: this.modalData.endHour,
      firstName: this.modalData.firstName,
      name: this.modalData.name,
      phoneNumber: this.modalData.phoneNumber ? `${this.modalData.phoneNumber}` : '',
      speciality: this.modalData.speciality,
      startHour: this.modalData.startHour,
      id: this.modalData._id,
      password: null
    });
  }
}
