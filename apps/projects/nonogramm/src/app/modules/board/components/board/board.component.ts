import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GameData } from '../../../../models/game-data';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../../services/storage.service';

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
  hearts = 3;

  constructor(
    private readonly board: BoardService,
    private readonly  router: Router,
    private readonly storage: StorageService,
  ) {
  }

  onGood() {
    this.goodCount++;
    this.checkBoard();
  }

  onFailed() {
    this.failedCount++;
    // this.hearts = 3 - this.failedCount;
    this.checkBoard();
  }

  private checkBoard() {
    this.storage.saveGame(this.boardData);
    if (this.goodCount >= 10) {
    }
    if (this.failedCount >= 30) {
      alert('Sie haben leider verloren');
      this.router.navigate(['']);
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
