import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticStaffComponent } from './statistic-staff.component';

describe('StatisticStaffComponent', () => {
  let component: StatisticStaffComponent;
  let fixture: ComponentFixture<StatisticStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
