import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { LoggerService } from '@bpa/core';
import { instance, mock } from 'ts-mockito';
import { TitleBarService } from '../../../core/src/lib/modules/navigation/services/title-bar.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    const titleBarMock = mock(TitleBarService);
    const loggerService = mock(LoggerService);
    void TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AppComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: LoggerService, useFactory: () => instance(loggerService) },
        { provide: TitleBarService, useFactory: () => instance(titleBarMock) },
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
