import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEffetsComponent } from './list-effets.component';

describe('ListEffetsComponent', () => {
  let component: ListEffetsComponent;
  let fixture: ComponentFixture<ListEffetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEffetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEffetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
