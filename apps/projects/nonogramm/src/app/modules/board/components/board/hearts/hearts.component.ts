
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TrackByPropertyPipe } from '@bpa/core';

@Component({
  selector: 'app-hearts',
  templateUrl: './hearts.component.html',
  styleUrls: ['./hearts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconModule,
    TrackByPropertyPipe
],
})
export class HeartsComponent implements OnChanges {
  @Input() hearts: number;

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
