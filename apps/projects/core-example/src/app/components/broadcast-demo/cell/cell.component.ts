import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  @Input() id: number;

  constructor(private readonly data: DataService) {
  }
}
