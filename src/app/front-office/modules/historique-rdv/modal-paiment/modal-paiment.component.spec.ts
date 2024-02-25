import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPaimentComponent } from './modal-paiment.component';

describe('ModalPaimentComponent', () => {
  let component: ModalPaimentComponent;
  let fixture: ComponentFixture<ModalPaimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPaimentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPaimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
