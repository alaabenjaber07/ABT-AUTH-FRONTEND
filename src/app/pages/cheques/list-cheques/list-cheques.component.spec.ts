import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChequesComponent } from './list-cheques.component';

describe('ListChequesComponent', () => {
  let component: ListChequesComponent;
  let fixture: ComponentFixture<ListChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChequesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
