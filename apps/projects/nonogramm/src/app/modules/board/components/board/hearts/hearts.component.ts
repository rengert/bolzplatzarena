import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-hearts',
  templateUrl: './hearts.component.html',
  styleUrls: ['./hearts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeartsComponent implements OnChanges {
  @Input() hearts = 3;
  items: any[];

  ngOnChanges(changes: SimpleChanges): void {
    this.items = Array(this.hearts);
  }
}
