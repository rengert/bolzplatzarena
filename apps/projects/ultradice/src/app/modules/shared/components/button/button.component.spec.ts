import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ButtonComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
