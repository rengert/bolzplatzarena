import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Caption } from '../../../../../models/caption';
import { Config } from '../../../../../models/config';
import { CoreModule } from '../../../../../../../../core/src/lib/core.module';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-caption',
    templateUrl: './caption.component.html',
    styleUrls: ['./caption.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, CoreModule],
})
export class CaptionComponent implements OnChanges {
  @Input() config: Config;
  @Input() numbers: Caption[];
  @Input() @HostBinding('class.vertical') vertical: boolean;

  @HostBinding('class') cssClass: string;
  @HostBinding('class') numbersClass: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.numbersClass = `text-length-${this.numbers.length}`;
    this.cssClass = `board-size-${this.config.size}`;
  }
}
