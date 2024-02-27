import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticBookingComponent } from './statistic-booking.component';

describe('StatisticBookingComponent', () => {
  let component: StatisticBookingComponent;
  let fixture: ComponentFixture<StatisticBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
