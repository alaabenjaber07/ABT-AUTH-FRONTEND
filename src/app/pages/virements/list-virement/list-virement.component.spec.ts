import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVirementComponent } from './list-virement.component';

describe('ListVirementComponent', () => {
  let component: ListVirementComponent;
  let fixture: ComponentFixture<ListVirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
