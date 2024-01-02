import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) {
  }

  show(text: string): void {
    this.snackBar.open(text, undefined, { duration: 1500 });
  }
}
