import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticBusinessComponent } from './statistic-business.component';

describe('StatisticBusinessComponent', () => {
  let component: StatisticBusinessComponent;
  let fixture: ComponentFixture<StatisticBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticBusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
