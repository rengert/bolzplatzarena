import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpeedDialService } from '@bpa/core';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { BaseComponent } from '../../../../components/base/base.component';
import { City } from '../../../../models/city.model';
import { Office } from '../../../../models/office.model';
import { StaticDataService } from '../../../base/services/static-data.service';
import { OfficeService } from '../../services/office.service';

@Component({
  selector: 'app-open-office',
  templateUrl: './open-office.component.html',
  styleUrls: ['./open-office.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenOfficeComponent extends BaseComponent {
  readonly cities$: Observable<City[]>;

  readonly form: UntypedFormGroup;

  constructor(
    speedDial: SpeedDialService,
    private readonly office: OfficeService,
    private readonly router: Router,
    private readonly staticData: StaticDataService,
  ) {
    super(speedDial);
    this.buttons = [
      { key: 'OfficeList', icon: 'assignment', route: ['offices'] },
    ];

    this.cities$ = this.staticData.getCities$();

    this.form = new UntypedFormGroup({
      city: new UntypedFormControl('', Validators.required),
      name: new UntypedFormControl('', Validators.required),
      address: new UntypedFormControl('', Validators.required),
    });
  }

  async open(): Promise<void> {
    return this.openOffice({ ...this.form.value });
  }

  async openOffice(office: Office): Promise<void> {
    const newOffice: Office = {
      ...office,
      monthlyCost: 1000,
      size: 0,
      id: uuid(),
    };

    await this.office.open(newOffice)
      .then(() => void this.router.navigate(['/offices', newOffice.id]));
  }
}
