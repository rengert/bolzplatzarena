import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndResultComponent } from './end-result.component';

describe('EndResultComponent', () => {
  let component: EndResultComponent;
  let fixture: ComponentFixture<EndResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
