import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { StatisticService } from '../../../../services/statistic/statistic.service';

@Component({
  selector: 'app-statistic-business',
  standalone: true,
  imports: [],
  templateUrl: './statistic-business.component.html',
  styleUrl: './statistic-business.component.scss'
})
export class StatisticBusinessComponent {
  @ViewChild("businessGraph") bookingGraph?: ElementRef;

  data = { type: "date", date: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), };

  statDatas: any = [];

  barChart?: Chart;

  constructor(private statService: StatisticService) {

  }

  ngOnInit() {
    this.getStatBusiness();
  }

  designBarChart(data: number[], labels: string[]) {
    if (this.barChart)
      this.barChart.destroy()

    const ctx = this.bookingGraph?.nativeElement;

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: "Chiffre d'affaire",
          data,
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

  onSelect(e: any) {
    const { name, value } = e.target;
    if (name === "type2") {
      if (value === "date") {
        const dateValue = this.data.date + "-01";
        this.data = { ...this.data, type: value, date: dateValue }
      } else {
        const dateValue = this.data.date.substring(0, 7);
        this.data = { ...this.data, type: value, date: dateValue };
      }
    } else {
      this.data = { ...this.data, [name]: value };
    }

    const { date, type } = this.data;
    if (date !== "" && type !== "") {
      this.getStatBusiness();
    }
  }

  getStatBusiness() {
    this.statService.getStatBusiness(this.data).subscribe((data: any) => {
      const { data: chartData, labels } = data;
      console.log(data)
      this.designBarChart(chartData, labels);
    })

  }

}
