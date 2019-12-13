import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GameData } from '../../../../models/game-data';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnChanges {
  @Input() boardData: GameData;
  columnHints: number[][];
  rowHints: number[][];
  failedCount = 0;
  goodCount = 0;

  constructor(private readonly board: BoardService) {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.boardData) {
      return;
    }
    // columns
    this.columnHints = this.board.generateColumnHints(this.boardData);

    // rows
    this.rowHints = this.board.generateRowHints(this.boardData);
  }
}
