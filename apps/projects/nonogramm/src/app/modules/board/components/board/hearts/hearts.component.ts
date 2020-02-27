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
  items: number[];

  ngOnChanges(changes: SimpleChanges): void {
    try {
      this.items = [];
      for (let i = 1; i <= this.hearts; i++) {
        this.items.push(i);
      }
      this.heartClass = `hearts-${this.hearts}`;
    } catch {
      //
    }
  }
}
