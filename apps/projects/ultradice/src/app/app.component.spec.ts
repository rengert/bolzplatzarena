import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerService, NotificationService, TitleBarService } from '@bpa/core';
import { TranslateService } from '@ngx-translate/core';
import { instance, mock } from 'ts-mockito';
import 'zone.js/dist/zone-testing';
import { DialogService } from '../../../core/src/lib/modules/dialog/services/dialog.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(async () => {
    const titleBarMock = mock(TitleBarService);
    const loggerServiceMock = mock(LoggerService);
    const notificationServiceMock = mock(NotificationService);
    const dialogServiceMock = mock(DialogService);
    const translateService = mock(TranslateService);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: LoggerService, useFactory: () => instance(loggerServiceMock) },
        { provide: NotificationService, useFactory: () => instance(notificationServiceMock) },
        { provide: TitleBarService, useFactory: () => instance(titleBarMock) },
        { provide: DialogService, useFactory: () => instance(dialogServiceMock) },
        { provide: TranslateService, useFactory: () => instance(translateService) },
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
