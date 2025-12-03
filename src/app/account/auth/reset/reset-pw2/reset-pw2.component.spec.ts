import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPw2Component } from './reset-pw2.component';

describe('ResetPw2Component', () => {
  let component: ResetPw2Component;
  let fixture: ComponentFixture<ResetPw2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPw2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPw2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
