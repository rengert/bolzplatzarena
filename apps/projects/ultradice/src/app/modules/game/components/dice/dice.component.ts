import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiceComponent {
  @Input() id = '0';
  @Input() @HostBinding('attr.data-value') value = 0;
  @HostBinding('class.fixed') fixed = false;

  @HostListener('click') click(): void {
    this.fixed = !this.fixed;
  }

  constructor(private readonly dataService: DataService) {
  }
}
