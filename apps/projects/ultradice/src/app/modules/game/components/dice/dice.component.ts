import { Component, OnInit, HostListener, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiceComponent implements OnInit {
  @Input()
  id = 0;
  @Input()
  @HostBinding('attr.data-value')
  value = 0;
  @HostBinding('class.fixed') fixed = false;

  @HostListener('click') click() {
     this.fixed = !this.fixed;
  }

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  public shuffel() {
    if (this.id === 0) {
      // error case
      return;
    }
    if (!this.fixed) {
      this.value = Math.ceil((Math.random() * 6));
      this.dataService.updateShuffleStatistic('dice.' + this.id + '.' + this.value);
    }
  }
}
