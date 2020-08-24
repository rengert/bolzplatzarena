import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { TimeSimulatorService } from '../../services/simulators/time-simulator.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateComponent {
  readonly date$: Observable<Moment>;

  constructor(timeSimulator: TimeSimulatorService) {
    this.date$ = timeSimulator.date$;
  }
}
