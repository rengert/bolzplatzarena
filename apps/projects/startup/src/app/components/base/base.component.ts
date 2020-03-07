import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Button } from '../../../../../core/src/lib/modules/button/components/speed-dial/speed-dial.component';
import { SpeedDialService } from '../../../../../core/src/lib/modules/button/services/speed-dial.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit, OnDestroy {
  protected buttons?: Button[];

  constructor(private readonly speedDial: SpeedDialService) {
  }

  ngOnInit(): void {
    if (this.buttons && this.buttons.length) {
      this.speedDial.register(this.buttons);
    }
  }

  ngOnDestroy(): void {
    if (this.buttons && this.buttons.length) {
      this.speedDial.unregsiter(this.buttons);
    }
  }
}
