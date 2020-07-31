import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONSTANTS } from '../../../../constants';
import { Office } from '../../../../models/office.model';
import { StartupService } from '../../../../services/startup.service';

interface OfficeDetails extends Office {
  space: number;
  nextUpgradCost?: number;
}

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeComponent implements OnInit {
  office$: Observable<OfficeDetails>;
  private readonly id: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly startup: StartupService,
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.office$ = this.startup.watch$()
      .pipe(
        map(startup => startup?.offices?.find(office => office.id === this.id)),
        map(office => {
          if (!office) {
            throw new Error('Incorrect url opened');
          }

          return {
            ...office,
            space: CONSTANTS.office.space[office.size],
            nextUpgradCost: CONSTANTS.office.prices.upgrade[office.size + 1],
          };
        }),
      );
  }
}
