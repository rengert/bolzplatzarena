import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
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

  ngOnInit(): void {
    if (typeof Worker === 'undefined') {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    } else {
      const worker = new Worker('./app.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        // tslint:disable-next-line:no-console
        console.log(`web worker: ${data}`);
      };
      worker.postMessage('started');
    }
  }
}
