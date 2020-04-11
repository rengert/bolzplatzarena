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

  badge$: Observable<string>;

  constructor(private readonly data: DataService) {
  }

  ngOnInit(): void {
    this.badge$ = this.data.get$(this.id);
  }
}
