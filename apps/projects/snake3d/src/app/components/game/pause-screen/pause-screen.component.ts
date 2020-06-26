import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pause-screen',
  templateUrl: './pause-screen.component.html',
  styleUrls: ['./pause-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PauseScreenComponent {
}
