import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Office } from '../../../../models/office.model';
import { OfficeService } from '../../services/office.service';

@Component({
  selector: 'app-open-office',
  templateUrl: './open-office.component.html',
  styleUrls: ['./open-office.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenOfficeComponent {
  readonly form = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  constructor(private readonly office: OfficeService, private readonly router: Router) {
  }

  open(): void {
    this.openOffice({ ...this.form.value });
  }

  openOffice(office: Office): void {
    this.office.open(office)
      .subscribe(_ => this.router.navigate(['/']));
  }
}
