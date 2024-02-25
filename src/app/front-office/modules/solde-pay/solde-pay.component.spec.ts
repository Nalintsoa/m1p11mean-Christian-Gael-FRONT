import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldePayComponent } from './solde-pay.component';

describe('SoldePayComponent', () => {
  let component: SoldePayComponent;
  let fixture: ComponentFixture<SoldePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoldePayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoldePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
