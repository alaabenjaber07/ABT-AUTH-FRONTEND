import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVirementComponent } from './edit-virement.component';

describe('EditVirementComponent', () => {
  let component: EditVirementComponent;
  let fixture: ComponentFixture<EditVirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
