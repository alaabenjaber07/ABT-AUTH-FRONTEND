import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChequesComponent } from './add-cheques.component';

describe('AddChequesComponent', () => {
  let component: AddChequesComponent;
  let fixture: ComponentFixture<AddChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChequesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
