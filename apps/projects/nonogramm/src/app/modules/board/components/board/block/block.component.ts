import { Component, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Config } from '../../../../../models/config';
import { GameBlock } from '../../../../../models/game-block';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnChanges {
  @Input() config: Config;
  @Input() selectExpected: boolean;
  @Input() block: GameBlock;
  @HostBinding('class') cssClass = '';
  @HostBinding('class.failed') failed: boolean;
  @HostBinding('class.good') good: boolean;
  none: boolean;
  @Output() goodEvent = new EventEmitter<void>();
  @Output() failedEvent = new EventEmitter<void>();
  @Output() actionEvent = new EventEmitter<void>();

  @HostListener('click') onClick() {
    if (this.block.show) {
      return;
    }
    this.block.show = true;
    this.failed = !this.block.expected && this.selectExpected;
    this.good = this.block.expected;
    this.none = !this.block.expected;
    if (this.failed) {
      this.failedEvent.emit();
    }
    if (this.good) {
      this.goodEvent.emit();
    }
    this.actionEvent.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.block) {
      if (this.block.show) {
        if (this.config) {
          this.cssClass = `board-size-${this.config.size}`;
        }
        this.good = this.block.expected;
        this.none = !this.block.expected;
      }
    }
  }
}
