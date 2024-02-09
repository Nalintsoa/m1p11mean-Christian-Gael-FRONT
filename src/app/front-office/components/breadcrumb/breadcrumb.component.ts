import { Component, Input } from '@angular/core';
import { IBreadCrumb } from '../../models/breadCrumbInteface';
import { BREADCRUMBS } from '../../constants/breadCrumbs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input('menu') menuSelected: IBreadCrumb = BREADCRUMBS[0];
}