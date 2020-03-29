import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Direction } from '../../../app.constants';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent {
  Direction = Direction;
  @Output() readonly control = new EventEmitter<Direction>();
}
