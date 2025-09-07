import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVirementComponent } from './add-virement.component';

describe('AddVirementComponent', () => {
  let component: AddVirementComponent;
  let fixture: ComponentFixture<AddVirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
