import { CommonModule, formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { StatisticService } from '../../../../services/statistic/statistic.service';

@Component({
  selector: 'app-statistic-business',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistic-business.component.html',
  styleUrl: './statistic-business.component.scss'
})
export class StatisticBusinessComponent {

  doughnut?: Chart<'doughnut', number[], string>;

  @ViewChild("beneficeGraph") beneficeGraph?: ElementRef;

  filterData = { type: "month", date: formatDate(new Date(), 'yyyy-MM', 'en-US'), };

  spending: { sale: number, rent: number, piece: number, other: number } = { sale: 0, rent: 0, piece: 0, other: 0 };

  sumSpending: number = 0;

  constructor(public statService: StatisticService) { }

  ngOnInit() {
    this.getStatBusiness();
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
          label: 'My First Dataset',
          data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 102, 231)',
            'rgb(255, 205, 86)',
            'rgb(215, 99, 112)',
            'rgb(54, 162, 235)',

          ],
        }]
      }, options: {
        responsive: true, // make sure chart responds to container size
        maintainAspectRatio: false // allow chart to ignore aspect ratio and fill container
      }
    });
  }

  onChange(e: any) {
    const { name, value } = e.target;
    if (name === "date")
      this.filterData.date = value;
    else {
      this.spending = { ...this.spending, [name]: value };

    }




  }

  getStatBusiness() {
    this.statService.getStatBusiness(this.filterData).subscribe((data: any) => {
      const obj = { ...this.spending, amount: Number(data?.amount) - this.sumSpending }

      const chartData = Object.entries(obj).map(([key, value]) => value
      )

      const chartLabel = Object.entries(obj).map(([key]) => {
        switch (key) {
          case 'sale':
            return 'Salaire'
          case 'rent':
            return 'Loyer'
          case 'piece':
            return 'Achat de pièces'
          case 'other':
            return 'Autres dépense'

          default:
            return 'Bénéfice'
        }

      })

      this.designChart(chartData, chartLabel);

    })

  }

}
