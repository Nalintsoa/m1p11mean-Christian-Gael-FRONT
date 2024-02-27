import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticBeneficeComponent } from './statistic-benefice.component';

describe('StatisticBeneficeComponent', () => {
  let component: StatisticBeneficeComponent;
  let fixture: ComponentFixture<StatisticBeneficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticBeneficeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StatisticBeneficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
