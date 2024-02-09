import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontLinkComponent } from './front-link.component';

describe('FrontLinkComponent', () => {
  let component: FrontLinkComponent;
  let fixture: ComponentFixture<FrontLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
