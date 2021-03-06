import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { LoggerService, NotificationService, TitleBarService } from '@bpa/core';
import { WorkerManager } from 'angular-web-worker/angular';
import { instance, mock } from 'ts-mockito';
import { AppComponent } from './app.component';
import { SIMULATOR } from './services/simulators/simulator';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    const titleBarMock = mock(TitleBarService);
    const loggerServiceMock = mock(LoggerService);
    const notificationServiceMock = mock(NotificationService);
    const workerManagerMock = mock(WorkerManager);

    void TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AppComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: LoggerService, useFactory: () => instance(loggerServiceMock) },
        { provide: NotificationService, useFactory: () => instance(notificationServiceMock) },
        { provide: TitleBarService, useFactory: () => instance(titleBarMock) },
        { provide: WorkerManager, useFactory: () => instance(workerManagerMock) },
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
