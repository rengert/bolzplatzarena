import { Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { GameBlock } from '../../../../models/game-block';
import { GameData } from '../../../../models/game-data';
import { StorageService } from '../../../../services/storage.service';
import { BoardService } from '../../services/board.service';

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
  @Output() resultEvent = new EventEmitter<boolean>();

  constructor(
    private readonly board: BoardService,
    private readonly  router: Router,
    private readonly storage: StorageService,
    private readonly dialog: MatDialog,
  ) {
  }

  onGood() {
    this.goodCount++;
  }

  onFailed() {
    this.boardData.failed++;
    this.hearts = 3 - this.boardData.failed;
  }

  onAction() {
    this.checkBoard();
  }

  private checkBoard() {
    this.hearts = 3 - this.boardData.failed;
    this.storage.saveGame(this.boardData);
    if (this.boardData.failed >= 3) {
      this.resultEvent.emit(false);
    }
    const flattenedArray = [].concat(...this.boardData.current) as GameBlock[];
    const missing = flattenedArray.filter(item => item.expected && !item.show);
    if (missing.length === 0) {
      this.resultEvent.emit(true);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.boardData) {
      return;
    }
    this.cssClass = `board-size-${this.boardData.config.size}`;
    this.columnHints = this.board.generateColumnHints(this.boardData);
    this.rowHints = this.board.generateRowHints(this.boardData);
    this.hearts = 3 - this.boardData.failed || 0;
  }
}
