import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChickenComponent } from './add-chicken.component';

describe('AddChickenComponent', () => {
  let component: AddChickenComponent;
  let fixture: ComponentFixture<AddChickenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddChickenComponent]
    });
    fixture = TestBed.createComponent(AddChickenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
