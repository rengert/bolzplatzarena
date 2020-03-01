import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Startup } from '../../../models/startup.model';
import { StartupService } from '../../../services/startup.service';

@Component({
  selector: 'app-startup-avatar',
  templateUrl: './startup-avatar.component.html',
  styleUrls: ['./startup-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartupAvatarComponent implements OnInit {
  startup$: Observable<Startup | undefined>;

  constructor(private readonly startup: StartupService) {
  }

  ngOnInit(): void {
    this.startup$ = this.startup.get$();
  }
}
