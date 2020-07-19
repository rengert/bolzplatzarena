import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Profession } from '../../../models/profession.model';
import { ProfessionService } from '../../../modules/profession/services/profession.service';

@Component({
  selector: 'app-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionsComponent {
  readonly columns = ['name', 'description', 'type', 'salaryFactor'];
  readonly data$: Observable<Profession[]>;

  constructor(private readonly profession: ProfessionService) {
    this.data$ = this.profession.get$();
  }
}
