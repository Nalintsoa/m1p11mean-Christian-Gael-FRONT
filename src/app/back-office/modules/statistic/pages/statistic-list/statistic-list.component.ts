import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistic-list',
  standalone: true,
  imports: [],
  templateUrl: './statistic-list.component.html',
  styleUrl: './statistic-list.component.scss'
})
export class StatisticListComponent {
  @ViewChild('CANVAS') elementRef?: ElementRef;

  ngAfterViewInit() {
    console.log(this.elementRef?.nativeElement)
    const ctx = this.elementRef?.nativeElement
    console.log(ctx)

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  test(e: any) {
    console.log(e.target.value)
  }
}
