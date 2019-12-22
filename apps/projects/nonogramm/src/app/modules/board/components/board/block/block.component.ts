import { Component, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { GameBlock } from '../../../../../models/game-block';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnChanges {
  @Input() selectExpected: boolean;
  @Input() block: GameBlock;
  @HostBinding('class.failed') failed: boolean;
  @HostBinding('class.good') good: boolean;
  @HostBinding('class.none') none: boolean;
  @Output() goodEvent = new EventEmitter<void>();
  @Output() failedEvent = new EventEmitter<void>();

  @HostListener('click') onHover() {
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.block.show) {
      this.good = this.block.expected;
      this.none = !this.block.expected;
    }
  }
}
