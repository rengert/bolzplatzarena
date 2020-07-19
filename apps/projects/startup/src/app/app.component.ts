import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoggerService } from '@bpa/core';
import { Observable } from 'rxjs';
import { TitleBarService } from '../../../core/src/lib/modules/navigation/services/title-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly title$: Observable<string | undefined>;

  constructor(private readonly logger: LoggerService<AppComponent>, private readonly titleBar: TitleBarService) {
    this.logger.name = 'AppComponent';
    this.logger.info('Application started');

    this.title$ = this.titleBar.title$;
  }
}
