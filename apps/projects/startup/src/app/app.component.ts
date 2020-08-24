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
    private readonly logger: LoggerService<AppComponent>,
    private readonly notification: NotificationService,
    private readonly startUp: StartupService,
    private readonly titleBar: TitleBarService,
    simulation: SimulationService,
  ) {
    this.logger.name = 'AppComponent';
    this.logger.info('Application started');

    this.title$ = this.titleBar.title$;

    this.startUp.watch$().pipe(
      filter(data => !!data),
      delay(999),
      tap(data => this.notification.show(`Willkommen ${data.founder.firstname}!`)),
      first(),
    ).subscribe();
  }
}
