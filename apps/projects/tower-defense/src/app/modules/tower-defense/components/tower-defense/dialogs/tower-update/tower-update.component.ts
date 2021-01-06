import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tower } from '../../../../models/tower.model';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-tower-update',
  templateUrl: './tower-update.component.html',
  styleUrls: ['./tower-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TowerUpdateComponent {
  constructor(
    private readonly account: AccountService,
    private readonly dialogRef: MatDialogRef<TowerUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) readonly tower: Tower) {
  }

  upgrade(): void {
    if (this.tower.level === 3) {
      return;
    }

    if (!this.account.pay(50)) {
      return;
    }

    this.tower.level++;
    this.dialogRef.close();
  }
}
