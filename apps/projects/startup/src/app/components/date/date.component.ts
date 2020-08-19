import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { SimulationService } from '../../services/simulation.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateComponent {
  readonly date$: Observable<Moment>;

  constructor(private readonly simulation: SimulationService) {
    this.date$ = this.simulation.date$;
  }
}
