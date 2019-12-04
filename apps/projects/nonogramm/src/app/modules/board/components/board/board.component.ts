import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  readonly boardData: any[][];
  failedCount = 0;
  goodCount = 0;

  constructor() {
    this.boardData = [];
    for (let i = 0; i < 15; i++) {
      const row = [];
      for (let itemIndex = 0; itemIndex < 15; itemIndex++) {
        row.push({});
      }
      this.boardData.push(row);
    }
  }

  onGood() {
    this.goodCount++;
    this.checkBoard();
  }

  onFailed() {
    this.failedCount++;
    this.checkBoard();
  }

  private checkBoard() {
    if (this.goodCount >= 10) {
      alert('you are god');
    }
    if (this.failedCount >= 3) {
      alert('sorry das war dann leider zu viel');
      document.location.reload();
    }
  }
}
