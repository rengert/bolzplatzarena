import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() expected: boolean;
  @HostBinding('class.failed') failed: boolean;
  @HostBinding('class.good') good: boolean;
  @Output() goodEvent = new EventEmitter<void>();
  @Output() failedEvent = new EventEmitter<void>();

  @HostListener('click') onHover() {
    if (this.failed || this.good) {
      return;
    }
    this.good = this.expected;
    this.failed = !this.good;
    if (this.failed) {
      this.failedEvent.emit();
    }
    if (this.good) {
      this.goodEvent.emit();
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

}
