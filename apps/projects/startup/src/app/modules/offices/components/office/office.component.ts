import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONSTANTS } from '../../../../constants';
import { Office } from '../../../../models/office.model';
import { MoneyService } from '../../../../services/money.service';
import { StartupService } from '../../../../services/startup.service';

interface OfficeDetails extends Office {
  space: number;
  nextUpgradeCost?: number;
}

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeComponent {
  office$: Observable<OfficeDetails>;
  private readonly id: string;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly credit: MoneyService,
    private readonly startup: StartupService,
  ) {
    this.id = this.activatedRoute.snapshot.params.id;
    this.office$ = this.startup.watch$().pipe(
      map(data => data?.offices?.find(office => office.id === this.id)),
      map(office => {
        if (!office) {
          throw new Error('Incorrect url opened');
        }

        return {
          ...office,
          space: CONSTANTS.office.space[office.size],
          nextUpgradeCost: CONSTANTS.office.prices.upgrade[office.size + 1],
        };
      }),
    );
  }

  async upgrade({ id, nextUpgradeCost, name }: OfficeDetails): Promise<void> {
    const startup = await this.startup.get();
    const office = startup.offices.find(item => item.id === id);
    if (office && !!nextUpgradeCost) {
      office.size++;
      office.monthlyCost = (office.size + 1) * 1000;
      await this.startup.update(startup);
      await this.credit.substract(nextUpgradeCost, `${name} wurde ausgebaut`);
    }
  }
}
