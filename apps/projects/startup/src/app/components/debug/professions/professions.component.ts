import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profession } from '../../../models/profession.model';
import { ProfessionService } from '../../../modules/profession/services/profession.service';

@Component({
  selector: 'app-professions',
  templateUrl: './professions.component.html',
  styleUrls: ['./professions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionsComponent implements OnInit {
  readonly columns = ['name', 'description', 'type', 'salaryFactor'];
  data$: Observable<Profession[]>;

  constructor(private readonly profession: ProfessionService) {
  }

  ngOnInit(): void {
    this.data$ = this.profession.get$();
  }
}
