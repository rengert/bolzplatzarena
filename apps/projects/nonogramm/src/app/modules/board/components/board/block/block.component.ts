
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Config } from '../../../../../models/config';
import { GameBlock } from '../../../../../models/game-block';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class BlockComponent implements OnChanges {
  @Input() config: Config;
  @Input() block: GameBlock;
  @Input() selectExpected: boolean;

  @Output() readonly action = new EventEmitter<boolean>();

  @HostBinding('class') cssClass = '';
  @HostBinding('class.failed') failed: boolean;
  @HostBinding('class.good') good: boolean;

  none: boolean;

  @HostListener('click') onClick(): void {
    if (this.block.show) {
      return;
    }

    this.block.show = true;
    this.failed = !this.block.expected && this.selectExpected || (!this.selectExpected && this.block.expected);
    this.good = this.block.expected;
    this.none = !this.block.expected;

    this.action.emit(this.failed);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.block && this.block.show) {
      this.cssClass = `board-size-${this.config.size}`;
      this.good = this.block.expected;
      this.none = !this.block.expected;
    }
  }
}
