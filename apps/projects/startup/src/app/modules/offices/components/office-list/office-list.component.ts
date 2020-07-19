import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
export class OfficeListComponent extends BaseComponent implements OnInit {
  readonly displayedColumns: string[] = ['name', 'city', 'address'];
  filterTerm: string;
  data$: Observable<MatTableDataSource<Office>>;
  data: MatTableDataSource<Office>;

  constructor(
    speedDial: SpeedDialService,
    private readonly offices: OfficeService,
  ) {
    super(speedDial);

    this.buttons = [
      { key: 'OpenOffice', icon: 'home_work', route: ['open-office'] },
    ];
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.data$ = this.offices.get$()
      .pipe(
        map(offices => new MatTableDataSource<Office>(offices)),
        tap(data => data.filter = this.filterTerm),
        tap(data => this.data = data),
      );
  }

  applyFilter(): void {
    this.data.filter = this.filterTerm;
  }
}
