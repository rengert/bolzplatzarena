import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { SpeedDialService } from '../../../../../../../core/src/lib/modules/button/services/speed-dial.service';
import { BaseComponent } from '../../../../components/base/base.component';
import { Office } from '../../../../models/office.model';
import { OfficeService } from '../../services/office.service';

@Component({
  selector: 'app-open-office',
  templateUrl: './open-office.component.html',
  styleUrls: ['./open-office.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenOfficeComponent extends BaseComponent {
  readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  constructor(speedDial: SpeedDialService, private readonly office: OfficeService, private readonly router: Router) {
    super(speedDial);
    this.buttons = [
      { key: 'OfficeList', icon: 'assignment', route: ['offices'] },
    ];
  }

  open(): void {
    this.openOffice({ ...this.form.value });
  }

  openOffice(office: Office): void {
    const newOffice = {
      ...office,
      id: uuid(),
    };
    this.office.open(newOffice)
      .subscribe(_ => this.router.navigate(['/offices', newOffice.id]));
  }
}
