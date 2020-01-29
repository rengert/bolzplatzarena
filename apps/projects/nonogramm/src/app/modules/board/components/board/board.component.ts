import { Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
  hearts = 3;
  selectType = true;
  @Output() resultEvent = new EventEmitter<boolean>();

  constructor(
    private readonly board: BoardService,
    private readonly storage: StorageService,
  ) {
  }

  onAction(failed: boolean) {
    if (failed) {
      this.boardData.failed++;
      this.hearts = 3 - this.boardData.failed;
    }
    this.checkBoard();
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
}
