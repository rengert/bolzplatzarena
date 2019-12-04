import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  readonly boardData: any[][];

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
}
