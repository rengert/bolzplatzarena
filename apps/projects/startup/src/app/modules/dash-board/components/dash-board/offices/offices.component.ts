import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Office } from '../../../../../models/office.model';
import { OfficeService } from '../../../../offices/services/office.service';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficesComponent implements OnInit {
  offices$: Observable<Office[]>;

  constructor(private readonly office: OfficeService) {
  }

  ngOnInit(): void {
    this.offices$ = this.office.get$();
  }
}
