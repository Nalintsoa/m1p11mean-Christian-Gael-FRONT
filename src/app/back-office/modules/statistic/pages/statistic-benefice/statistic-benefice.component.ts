import { CommonModule, formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { StatisticService } from '../../../../services/statistic/statistic.service';

@Component({
  selector: 'app-statistic-benefice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistic-benefice.component.html',
  styleUrl: './statistic-business.component.scss'
})
export class StatisticBeneficeComponent {

  doughnut?: Chart<'doughnut', number[], string>;

  @ViewChild("beneficeGraph") beneficeGraph?: ElementRef;

  filterData = { type: "month", date: formatDate(new Date(), 'yyyy-MM', 'en-US'), };

  spending: { sale: number, rent: number, piece: number, other: number } = { sale: 0, rent: 0, piece: 0, other: 0 };

  sumSpending: number = 0;

  constructor(public statService: StatisticService) { }

  ngOnInit() {
    this.getStatBenefice();
  }

  designChart(data: number[], labels: string[]) {
    if (this.doughnut) {
      this.doughnut.destroy()

    }

    this.statService.isLoading = false;

    const ctx = this.beneficeGraph?.nativeElement;

    this.doughnut = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Montant (Ar)',
          data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(144, 238, 144)',
            'rgb(255, 205, 86)',
            'rgb(255, 165, 0)',
            'rgb(156, 207, 242)',

          ],
        }]
      }, options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });
  }

  onChange(e: any) {
    const { name, value } = e.target;
    if (name === "date")
      this.filterData.date = value;
    else {
      this.spending = { ...this.spending, [name]: value ?? 0 };
    }

    this.getStatBenefice();
  }

  getStatBenefice() {
    const dataSend = { ...this.filterData, ...this.spending }
    this.statService.getStatBenefice(dataSend).subscribe((data: any) => {
      const { data: chartData, labels } = data;
      this.designChart(chartData, labels)

    })

  }

}
