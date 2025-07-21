import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddTitleComponent } from './add-title.component';

describe('FaqsComponent', () => {
  let component: AddTitleComponent;
  let fixture: ComponentFixture<AddTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
