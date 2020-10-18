import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent implements OnInit {
  @Input() id: number;

  @Input() id1: number;
  @Input() id2: number;
  @Input() id3: number;
  @Input() id4: number;
  @Input() id5: number;
  @Input() id6: number;
  @Input() id7: number;
  @Input() id8: number;
  @Input() id9: number;
  @Input() id10: number;
  @Input() id11: number;
  @Input() id12: number;
  @Input() id13: number;
  @Input() id14: number;
  @Input() id15: number;
  @Input() id16: number;
  @Input() id17: number;
  @Input() id18: number;
  @Input() id19: number;
  @Input() id20: number;

  badge$: Observable<string>;

  constructor(private readonly data: DataService) {
  }

  ngOnInit(): void {
    this.badge$ = this.data.get$(this.id);
  }
}
