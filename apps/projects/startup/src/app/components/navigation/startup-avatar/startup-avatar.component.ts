import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Startup } from '../../../models/startup.model';
import { StartupService } from '../../../services/startup.service';

@Component({
  selector: 'app-startup-avatar',
  templateUrl: './startup-avatar.component.html',
  styleUrls: ['./startup-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupAvatarComponent {
  readonly startup$: Observable<Startup | undefined>;

  constructor(startup: StartupService) {
    this.startup$ = startup.watch$();
  }
}
