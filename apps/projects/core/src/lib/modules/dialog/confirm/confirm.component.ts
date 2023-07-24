import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'bpa-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) readonly data: ConfirmDialogData) {
  }
}
