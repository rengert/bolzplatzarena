import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OnlineOfflineService } from '../../services/online-offline.service';

@Component({
  selector: 'app-online-offline',
  templateUrl: './online-offline.component.html',
  styleUrls: ['./online-offline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnlineOfflineComponent {
  constructor(readonly online: OnlineOfflineService) {
  }
}
