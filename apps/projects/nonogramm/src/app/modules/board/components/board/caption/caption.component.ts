import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaptionComponent implements OnChanges {
  @Input() numbers: number[];
  @Input() @HostBinding('class.vertical') vertical: boolean;
  numbersClass = 'default';

  ngOnChanges(changes: SimpleChanges) {
    this.numbersClass = 'text-length-' + this.numbers.length;
  }
}
