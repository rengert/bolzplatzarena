import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Office } from '../../../../models/office.model';
import { StartupService } from '../../../../services/startup.service';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeListComponent implements OnInit {
  readonly displayedColumns: string[] = ['name', 'address'];
  filterTerm: string;
  data$: Observable<MatTableDataSource<Office>>;
  data: MatTableDataSource<Office>;

  constructor(private readonly startup: StartupService) {
  }

  ngOnInit(): void {
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
