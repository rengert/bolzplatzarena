import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from '../../../models/level.model';
import { ProfessionService } from '../../../modules/profession/services/profession.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelsComponent {
  readonly columns = ['name', 'description', 'type', 'salaryFactor'];
  readonly data$: Observable<Level[]>;

  constructor(private readonly profession: ProfessionService) {
    this.data$ = this.profession.getLevels$();
  }
}
