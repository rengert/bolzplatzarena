import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

interface Cell {
  id: number;
}

@Component({
  selector: 'app-broadcast-demo',
  templateUrl: './broadcast-demo.component.html',
  styleUrls: ['./broadcast-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataService],
})
export class BroadcastDemoComponent implements OnInit {
  cells: Cell[][] = [];

  ngOnInit(): void {
    for (let line = 1; line <= 100; line++) {
      const lineArray: Cell[] = [];
      this.cells.push(lineArray);
      for (let id = 1; id <= 300; id++) {
        lineArray.push({ id: (line * 1000) + id });
      }
    }
  }
}
