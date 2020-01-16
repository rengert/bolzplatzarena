import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Config } from '../../../../../models/config';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptionComponent implements OnChanges {
  @Input() config: Config;
  @Input() numbers: number[];
  @HostBinding('class') cssClass = '';
  @Input() @HostBinding('class.vertical') vertical: boolean;
  numbersClass = 'default';

  ngOnChanges(changes: SimpleChanges) {
    this.numbersClass = 'text-length-' + this.numbers.length;
    if (this.config) {
      this.cssClass = `board-size-${this.config.size}`;
    }
  }
}
