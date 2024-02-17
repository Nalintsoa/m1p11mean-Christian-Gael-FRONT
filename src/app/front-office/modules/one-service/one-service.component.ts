import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-one-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './one-service.component.html',
  styleUrl: './one-service.component.scss'
})
export class OneServiceComponent implements OnInit{
  intervalle1 = [{
    debut : 10,
    fin: 13
  },
  {
    debut: 15,
    fin: 18
  }];

  intervalles2 = [{
    debut: 9,
    fin: 10
  }, {
    debut: 12,
    fin: 15
  },{
    debut: 16,
    fin: 17
  }];

  employeeName: any = ['int1', 'int2'];
  employees: any = [this.intervalle1, this.intervalles2];
  
  formattedArray: any = [];
  ngOnInit(): void {
    for (let i = 0; i < this.employees.length; i++) {
      this.formattedArray.push(this.getIntervalles(this.employees[i]));
      console.log(i);
    }
  }
  
  getCells(row: any): any[] {
    return Object.values(row);
  }

  getIntervalles(intervalles: {debut: number, fin: number}[]){
    const tab = [];
    
    for(let i = 0; i < intervalles.length; i++){
      for(let k = intervalles[i].debut; k < intervalles[i].fin; k++){
        tab.push(k);
      }
    }

    let obj: any = {};
    for(let i = 8; i < 17; i++){
      if (tab.includes(i)) {
        obj[`${i}`] = { value: i, status: false }
      } else {
        obj[`${i}`] = { value: i, status: true }
      }
    }

    return obj;
  }

  handleClick = (employee: any, item:any) => {
    console.log(item);
    console.log(employee);
  }
}
