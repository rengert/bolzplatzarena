import { Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Caption } from '../../../../models/caption';
import { GameBlock } from '../../../../models/game-block';
import { GameData } from '../../../../models/game-data';
import { StorageService } from '../../../../services/storage.service';
import { generateColumnHints, generateRowHints } from '../../services/board.util';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnChanges {
  @Input() boardData: GameData;
  @HostBinding('attr.class') cssClass: string;
  columnHints: Caption[][];
  rowHints: Caption[][];
  hearts = 3;
  selectType = true;
  @Output() readonly resultEvent = new EventEmitter<boolean>();

  constructor(
    private readonly storage: StorageService,
  ) {
  }

  onAction(failed: boolean): void {
    if (failed) {
      this.boardData.failed++;
      this.hearts = 3 - this.boardData.failed;
    }
    this.checkBoard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cssClass = `board-size-${this.boardData.config.size}`;
    this.checkBoard();
  }

  private checkBoard(): void {
    this.columnHints = generateColumnHints(this.boardData);
    this.rowHints = generateRowHints(this.boardData);

    this.hearts = 3 - this.boardData.failed;
    this.storage.saveGame(this.boardData);
    if (this.boardData.failed >= 3) {
      this.resultEvent.emit(false);
    }
    const flattenedArray = this.boardData.current
      .reduce((a, b) => [...a, ...b.data], [] as GameBlock[]);
    const missing = flattenedArray.filter(item => item.expected && !item.show);
    if (missing.length === 0) {
      this.resultEvent.emit(true);
    }
  }
}
