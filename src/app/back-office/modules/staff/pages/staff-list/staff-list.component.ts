import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../../../common/navbar/navbar.component';
import { BreadcrumbComponent } from '../../../../common/breadcrumb/breadcrumb.component';
import { INavigationItem } from '../../../../interfaces/breadCrumbInterfaces';
import { PATH_BACKOFFICE } from '../../../../routes/back-office-route';
import { CommonListComponent } from '../../../../common/common-list/common-list.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateModalComponent } from '../../components/create-modal/create-modal.component';
import { StaffApiService } from '../../../../service/staff-api.service';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CREATION_MODE, EDIT_MODE } from '../../../../constant/enum';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [NavbarComponent, BreadcrumbComponent, CommonListComponent, CreateModalComponent, CommonModule, FormsModule],
  templateUrl: './staff-list.component.html',
  styleUrl: './staff-list.component.scss'
})
export class StaffListComponent {
  searchQuery = "";
  arrayData: any = [];
  listToShow: any = [];
  dataCount = this.arrayData.length;
  currentPage = 1;
  perPage = 5;

  modalMode = CREATION_MODE;
  modalData: any = {};

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

  constructor(private staffApiService: StaffApiService){
    this.getAllStaffs();

    this.staffApiService.RefreshRequired.subscribe(result => {
      this.getAllStaffs();
    })
  }

  getAllStaffs(){
    this.staffApiService.getStaffList().subscribe((data) => {
     const result: any = data;
     this.listToShow = data;
    this.loadData();
    })    
  };

  pathsArray: INavigationItem[] = [
    {
      label: 'Gestion de personnel',
      path: `${PATH_BACKOFFICE}/staff`
    },
    {
      label: 'Liste',
    }
  ];

  // ACTION ON THE TABLE
  handleSearchChange = () => {
    this.currentPage = 1;
    this.data = this.queriedList();
  }

  handlePerPage = () => {
    this.currentPage = 1;
    this.queriedList();
  }

  queriedList = () => {
    const tempArray = this.listToShow.filter((item: any) => {
      return Object.values(item).toString().toLowerCase().includes(this.searchQuery.toLowerCase());
    });
    this.dataCount = this.arrayData.length;
    return tempArray;
  }

  // handleClickNext = () => {
  //   if (this.currentPage === (this.dataCount % this.perPage) + 1) {
  //     return;
  //   }
  //   ++this.currentPage;
  //   this.queriedList();
  //   console.log(this.currentPage)
  // }

  // handleClickPrevious = () => {
  //   if (this.currentPage > 0) {
  //     --this.currentPage;
  //   }
  //   this.queriedList();
  //   console.log(this.currentPage)
  // }

  data = this.queriedList();
  totalPages = 0;
  
  loadData() {
    this.data = this.queriedList();
    this.totalPages = Math.floor(this.data.length / this.perPage);
  }

  getPaginatedData() {
    const startIndex = (this.currentPage - 1) * this.perPage;
    return this.data.slice(startIndex, startIndex + this.perPage);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  // END OF ACTION ON THE TABLE

  handleClickRow = (row: any) => {
    this.modalData = row;
    this.modalMode = EDIT_MODE;
    
    this.modalComponent.openModal();
    this.modalComponent.mode = EDIT_MODE;

    console.log(row);

    this.modalComponent.staffForm.setValue({
      careerStart: formatDate(this.modalData.careerStart, 'yyyy-MM-dd', 'en-US'),
      cinNumber: `${this.modalData.cinNumber}`,
      email: this.modalData.email,
      endHour: this.modalData.endHour,
      firstName: this.modalData.firstName,
      name: this.modalData.name,
      phoneNumber: this.modalData.phoneNumber ? `${this.modalData.phoneNumber}` : '',
      skills: `${this.modalData.skills.join(", ")}`,
      speciality: this.modalData.speciality,
      startHour: this.modalData.startHour,
      id: this.modalData._id,
    });

    console.log(this.modalMode);
    console.log(this.modalData);
  }

  @ViewChild(CreateModalComponent)
  private modalComponent!: CreateModalComponent;
}
