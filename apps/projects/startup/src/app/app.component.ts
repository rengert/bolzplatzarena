import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoggerService } from '@bpa/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private readonly logger: LoggerService<AppComponent>) {
    this.logger.debug('Application started');
  }
}
