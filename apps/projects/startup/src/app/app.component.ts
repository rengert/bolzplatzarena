import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoggerService, NotificationService, TitleBarService } from '@bpa/core';
import { Observable } from 'rxjs';
import { delay, filter, first, tap } from 'rxjs/operators';
import { SimulationService } from './services/simulation.service';
import { StartupService } from './services/startup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly title$: Observable<string | undefined>;

  constructor(
    logger: LoggerService<AppComponent>,
    notification: NotificationService,
    simulation: SimulationService,
    startUp: StartupService,
    titleBar: TitleBarService,
  ) {
    logger.name = 'AppComponent';
    logger.info('Application started');

    this.title$ = titleBar.title$;

    startUp.watch$().pipe(
      filter(data => !!data),
      delay(999),
      tap(data => notification.show(`Willkommen ${data.founder.firstname}!`)),
      first(),
    ).subscribe();
  }
}
