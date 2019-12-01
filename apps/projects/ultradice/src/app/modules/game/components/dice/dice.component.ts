import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiceComponent {
  @Input() id = 0;
  @Input() @HostBinding('attr.data-value') value = 0;
  @HostBinding('class.fixed') fixed = false;

  @HostListener('click') click() {
    this.fixed = !this.fixed;
  }

  constructor(private dataService: DataService) {
  }

  async shuffel() {
    if (this.id === 0) {
      // error case
      return;
    }
    if (!this.fixed) {
      this.value = Math.ceil((Math.random() * 6));
      await this.dataService.updateShuffleStatistic(`dice.all`);
      await this.dataService.updateShuffleStatistic(`dice.value.${this.value}`);
      await this.dataService.updateShuffleStatistic(`dice.${this.id}.${this.value}`);
    }
  }
}
