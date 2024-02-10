import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-common-list',
  standalone: true,
  imports: [CommonModule, DataTablesModule],
  templateUrl: './common-list.component.html',
  styleUrl: './common-list.component.scss'
})
export class CommonListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  languageSettings = {
    "emptyTable":     "Aucune donnée disponible dans le tableau",
    "info":           "Elément _START_ à _END_ sur _TOTAL_ éléments",
    "infoEmpty":      "Elément 0 à 0 sur 0 élément",
    "infoFiltered":   "(filtré à partir de _MAX_ éléments au total)",
    "thousands": ',',
    "lengthMenu":     "Afficher _MENU_ éléments",
    "loadingRecords": "Chargement...",
    "processing":     "Traitement...",
    "search":         "Rechercher :",
    "zeroRecords":    "Aucun élément correspondant trouvé",
    "paginate": {
      "first":    "Premier",
      "last":     "Dernier",
      "next":     "Suivant",
      "previous": "Précédent"
    },
    "aria": {
      "sortAscending":  ": activer pour trier la colonne par ordre croissant",
      "sortDescending": ": activer pour trier la colonne par ordre décroissant"
    },
  };

  @Input() arrayColumns: any[] = [];

  @Input() arrayData: any[] = [];

  someClickHandler(row: any): void {
    console.log(row);
  }

  ngOnInit(): void {
    this.dtOptions = {
      data: this.arrayData,
      columns: this.arrayColumns,
      language: this.languageSettings,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).off('click');
        $('td', row).on('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
    };
  }
}
