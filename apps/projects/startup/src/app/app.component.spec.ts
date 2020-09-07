import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { LoggerService, NotificationService, TitleBarService } from '@bpa/core';
import { instance, mock } from 'ts-mockito';
import { AppComponent } from './app.component';
import { SIMULATOR } from './services/simulators/simulator';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    const titleBarMock = mock(TitleBarService);
    const loggerServiceMock = mock(LoggerService);
    const notificationServiceMock = mock(NotificationService);
    void TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AppComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: LoggerService, useFactory: () => instance(loggerServiceMock) },
        { provide: NotificationService, useFactory: () => instance(loggerServiceMock) },
        { provide: TitleBarService, useFactory: () => instance(titleBarMock) },
        { provide: SIMULATOR, useValue: [], multi: true },

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
