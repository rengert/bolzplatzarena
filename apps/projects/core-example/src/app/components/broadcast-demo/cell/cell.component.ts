import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent implements OnInit {
  @Input() id: number;

  badge$: Observable<string>;

  ngOnInit(): void {
    // this.badge$ = this.data.get$(this.id);
  }
}
