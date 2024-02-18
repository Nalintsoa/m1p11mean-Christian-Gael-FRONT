import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneRowComponent } from './one-row.component';

describe('OneRowComponent', () => {
  let component: OneRowComponent;
  let fixture: ComponentFixture<OneRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
