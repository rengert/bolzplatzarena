import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
export class OpenOfficeComponent extends BaseComponent implements OnInit {
  cities$: Observable<City[]>;

  readonly form = new FormGroup({
    city: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

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
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.cities$ = this.staticData.getCities$();
  }

  open(): void {
    this.openOffice({ ...this.form.value });
  }

  openOffice(office: Office): void {
    const newOffice = {
      ...office,
      size: 0,
      id: uuid(),
    };
    this.office.open(newOffice)
      .subscribe(_ => this.router.navigate(['/offices', newOffice.id]));
  }
}
