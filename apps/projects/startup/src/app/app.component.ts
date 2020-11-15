import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoggerService, NotificationService, TitleBarService } from '@bpa/core';
import { WorkerClient, WorkerManager } from 'angular-web-worker/angular';
import { Observable } from 'rxjs';
import { delay, filter, first, tap } from 'rxjs/operators';
import { SimulationService } from './services/simulation.service';
import { StartupService } from './services/startup.service';
import { PropertyWorker } from './workers/property.worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly title$: Observable<string | undefined>;

  private client: WorkerClient<PropertyWorker>;

  constructor(
    private readonly simulation: SimulationService,
    private readonly workerManager: WorkerManager,
    logger: LoggerService<AppComponent>,
    notification: NotificationService,
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

  async ngOnInit(): Promise<void> {
    this.simulation.registerWorker(new Worker('./workers/project.worker', { type: 'module' }));
    this.simulation.registerWorker(new Worker('./app.worker', { type: 'module' }));

    this.client = this.workerManager.createClient(PropertyWorker);
    await this.client.connect();

    await this.client.call(client => client.call());
  }
}
