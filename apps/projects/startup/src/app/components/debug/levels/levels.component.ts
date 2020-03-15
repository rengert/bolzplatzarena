import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from '../../../models/level.model';
import { ProfessionService } from '../../../modules/profession/services/profession.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelsComponent implements OnInit {
  readonly columns = ['name', 'description', 'type', 'salaryFactor'];
  data$: Observable<Level[]>;

  constructor(private readonly profession: ProfessionService) {
  }

  ngOnInit(): void {
    this.data$ = this.profession.getLevels$();
  }
}
