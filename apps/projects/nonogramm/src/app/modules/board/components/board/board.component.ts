
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TrackByPropertyPipe } from '@bpa/core';
import { Caption } from '../../../../models/caption';
import { GameBlock } from '../../../../models/game-block';
import { GameData } from '../../../../models/game-data';
import { StorageService } from '../../../../services/storage.service';
import { generateColumnHints, generateRowHints } from '../../services/board.util';
import { BlockComponent } from './block/block.component';
import { CaptionComponent } from './caption/caption.component';
import { HeartsComponent } from './hearts/hearts.component';
import { SettingsViewComponent } from './settings-view/settings-view.component';

const HEART_LIMIT = 3;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    SettingsViewComponent,
    HeartsComponent,
    CaptionComponent,
    BlockComponent,
    MatFormFieldModule,
    FormsModule,
    TrackByPropertyPipe,
    MatSlideToggleModule
],
})
export class BoardComponent implements OnChanges {
  @Input() boardData: GameData;

  @Output() readonly resultEvent = new EventEmitter<boolean>();

  @HostBinding('attr.class') cssClass: string;

  columnHints: Caption[][];
  rowHints: Caption[][];
  hearts: number;
  selectType = true;

  constructor(private readonly storage: StorageService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cssClass = `board-size-${this.boardData.config.size}`;
    this.checkBoard();
  }

  onAction(failed: boolean): void {
    if (failed) {
      this.boardData.failed++;
      this.hearts = HEART_LIMIT - this.boardData.failed;
    }
    this.checkBoard();
  }

  private checkBoard(): void {
    this.columnHints = generateColumnHints(this.boardData);
    this.rowHints = generateRowHints(this.boardData);

    this.hearts = HEART_LIMIT - this.boardData.failed;
    this.storage.saveGame(this.boardData);
    if (this.boardData.failed >= HEART_LIMIT) {
      this.resultEvent.emit(false);
    }
    const blocks = this.boardData.current
      .reduce((blocks, row) => [...blocks, ...row.data], [] as GameBlock[]);
    const missing = blocks.filter(({ expected, show }) => expected && !show);
    if (missing.length === 0) {
      this.resultEvent.emit(true);
    }
  }
}
