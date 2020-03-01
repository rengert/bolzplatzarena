import { Component } from '@angular/core';
import { LoggerService } from '../../../core/src/lib/modules/logger/services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly logger: LoggerService<AppComponent>) {
    this.logger.debug('Application started');
  }
}
