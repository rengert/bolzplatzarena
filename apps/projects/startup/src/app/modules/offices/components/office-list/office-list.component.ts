import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { SpeedDialService } from '@bpa/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseComponent } from '../../../../components/base/base.component';
import { Office } from '../../../../models/office.model';
import { OfficeService } from '../../services/office.service';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeListComponent extends BaseComponent {
  readonly displayedColumns: string[] = ['name', 'city', 'address'];
  filterTerm: string;
  data$: Observable<MatTableDataSource<Office>>;
  data: MatTableDataSource<Office>;

  constructor(
    office: OfficeService,
    speedDial: SpeedDialService,
  ) {
    super(speedDial);

    this.buttons = [
      { key: 'OpenOffice', icon: 'home_work', route: ['open-office'] },
    ];
    this.data$ = office.watch$().pipe(
      map(data => new MatTableDataSource<Office>(data)),
      tap(data => {
        data.filter = this.filterTerm;
      }),
      tap(data => {
        this.data = data;
      }),
    );
  }

  applyFilter(): void {
    this.data.filter = this.filterTerm;
  }
}
