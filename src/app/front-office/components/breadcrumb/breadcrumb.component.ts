import { Component, Input } from '@angular/core';
import { IBreadCrumb } from '../../models/breadCrumbInteface';
import { BREADCRUMBS } from '../../constants/breadCrumbs';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, FaIconComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  faHome = faHome;
  @Input('menu') menuSelected: IBreadCrumb = BREADCRUMBS[0];
}