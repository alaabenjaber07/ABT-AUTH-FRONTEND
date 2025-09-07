import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEffetComponent } from './add-effet.component';

describe('AddEffetComponent', () => {
  let component: AddEffetComponent;
  let fixture: ComponentFixture<AddEffetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEffetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEffetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
