import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DebugService } from '../../services/debug.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugComponent {
  constructor(private readonly debug: DebugService) {
  }

  async deleteStartup(): Promise<void> {
    await this.debug.deleteStartup();
  }

  async deleteOffices(): Promise<void> {
    await this.debug.deleteOffices();
  }

  async clearLabourMarket(): Promise<void> {
    await this.debug.clearLabourMarket();
  }
}
