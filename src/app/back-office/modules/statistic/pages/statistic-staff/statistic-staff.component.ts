import { formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { StatisticService } from '../../../../services/statistic/statistic.service';

@Component({
  selector: 'app-statistic-staff',
  standalone: true,
  imports: [],
  templateUrl: './statistic-staff.component.html',
  styleUrl: './statistic-staff.component.scss'
})
export class StatisticStaffComponent implements AfterViewInit {
  @ViewChild("staffGraph") staffGraph?: ElementRef;

  data = { type: "date", date: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), };

  statDatas: any = [];

  barChart?: Chart;

  constructor(private statService: StatisticService, private zone: NgZone) {

  }

  ngOnInit() {
    this.getStatStaff();
  }

  ngAfterViewInit(): void {
    // this.getStatStaff();
  }

  designBarChart(data: number[], labels: string[]) {
    if (this.barChart)
      this.barChart.destroy()

    const ctx = this.staffGraph?.nativeElement;

    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: "Moyenne d'heure de travail (%)",
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



    if (name === "type") {
      if (value === "date") {
        const dateValue = this.data.date + "-01";
        this.data = { ...this.data, [name]: value, date: dateValue }
      } else {
        const dateValue = this.data.date.substring(0, 7);
        this.data = { ...this.data, [name]: value, date: dateValue };
      }
    } else {
      this.data = { ...this.data, [name]: value };
    }

    const { date, type } = this.data;
    if (date !== "" && type !== "") {
      this.getStatStaff();
    }
  }

  getStatStaff() {
    this.statService.getAverageStaff(this.data).subscribe((data: any) => {
      this.statDatas = data;
      const chartData: number[] = this.statDatas.map((stat: any) => stat?.hourAverage);
      const chartLabel: string[] = this.statDatas.map((stat: any) => stat?.firstName);

      this.designBarChart(chartData, chartLabel)
    })

  }



}
