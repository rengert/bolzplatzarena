import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmComponent, ConfirmDialogData } from '../confirm/confirm.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private readonly dialog: MatDialog) {
  }

  confirm(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog.open(ConfirmComponent, {
      width: '90%',
      data,
    })
      .afterClosed()
      .pipe(
        map(result => result === true),
      );
  }

  open<T, D = any, R = any>(component: ComponentType<T>, config?: MatDialogConfig<D>): void {
    this.dialog.open(component, config);
  }
}
