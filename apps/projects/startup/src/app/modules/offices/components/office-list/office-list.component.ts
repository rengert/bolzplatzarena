import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SpeedDialService } from '../../../../../../../core/src/lib/modules/button/services/speed-dial.service';
import { BaseComponent } from '../../../../components/base/base.component';
import { Office } from '../../../../models/office.model';
import { StartupService } from '../../../../services/startup.service';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeListComponent extends BaseComponent implements OnInit {
  readonly displayedColumns: string[] = ['name', 'address'];
  filterTerm: string;
  data$: Observable<MatTableDataSource<Office>>;
  data: MatTableDataSource<Office>;

  constructor(
    speedDial: SpeedDialService,
    private readonly startup: StartupService) {
    super(speedDial);
    this.buttons = [
      { key: 'OpenOffice', icon: 'home_work', route: ['open-office'] },
    ];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.data$ = this.startup.get$()
      .pipe(
        map(startup => startup ? startup.offices : []),
        map(office => new MatTableDataSource<Office>(office)),
        tap(data => data.filter = this.filterTerm),
        tap(data => this.data = data),
      );
  }

  applyFilter(): void {
    this.data.filter = this.filterTerm;
  }
}
