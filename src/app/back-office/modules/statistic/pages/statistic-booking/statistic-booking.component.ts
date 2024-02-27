import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { StatisticService } from '../../../../services/statistic/statistic.service';

@Component({
  selector: 'app-statistic-booking',
  standalone: true,
  imports: [],
  templateUrl: './statistic-booking.component.html',
  styleUrl: './statistic-booking.component.scss'
})
export class StatisticBookingComponent {
  @ViewChild("bookingGraph") bookingGraph?: ElementRef;

  data = { type: "date", date: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), };

  statDatas: any = [];

  barChart?: Chart;

  constructor(private statService: StatisticService) {

  }

  ngOnInit() {
    this.getStatBooking();
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
          label: "Nombre de réservation",
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
    if (name === "type1") {
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
      this.getStatBooking();
    }
  }

  getStatBooking() {
    this.statService.getStatBooking(this.data).subscribe((data: any) => {
      const { data: chartData, labels } = data;
      console.log(data)
      this.designBarChart(chartData, labels);
    })

  }
}
