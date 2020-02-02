import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hearts',
  templateUrl: './hearts.component.html',
  styleUrls: ['./hearts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeartsComponent implements OnChanges {
  @Input() hearts = 3;
  @HostBinding('class') heartClass: string;
  items: any[];

  ngOnChanges(changes: SimpleChanges) {
    try {
      this.items = Array(this.hearts);
      this.heartClass = 'hearts-' + this.hearts;
    } catch {
    }
  }
}
