import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  @HostBinding('attr.class') cssClass: string;
  columnHints: number[][];
  rowHints: number[][];
  goodCount = 0;
  hearts = 3;
  selectType = true;

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
    this.boardData.failed++;
    this.hearts = 3 - this.boardData.failed;
    this.checkBoard();
  }

  private checkBoard() {
    this.hearts = 3 - this.boardData.failed;
    this.storage.saveGame(this.boardData);
    if (this.goodCount >= 10) {
    }
    if (this.boardData.failed >= 30) {
      // alert('Sie haben leider verloren');
      // this.router.navigate(['']);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.boardData) {
      return;
    }
    this.cssClass = `board-size-${this.boardData.config.size}`;
    // columns
    this.columnHints = this.board.generateColumnHints(this.boardData);

    // rows
    this.rowHints = this.board.generateRowHints(this.boardData);

    // hearts
    this.hearts = 3 - this.boardData.failed || 0;
  }
}
