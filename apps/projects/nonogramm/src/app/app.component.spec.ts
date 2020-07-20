import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { Angulartics2Piwik } from 'angulartics2/piwik';
import { instance, mock } from 'ts-mockito';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    const translateMock = mock(TranslateService);
    const analyticsMock = mock(Angulartics2Piwik);
    void TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AppComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Angulartics2Piwik, useFactory: () => instance(analyticsMock) },
        { provide: TranslateService, useFactory: () => instance(translateMock) },
      ],
    })
      .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
