import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ListServiceComponent } from '../list-service/list-service.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, BreadcrumbComponent, ListServiceComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
