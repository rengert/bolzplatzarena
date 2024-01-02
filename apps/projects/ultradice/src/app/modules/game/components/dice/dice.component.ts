import { Component, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  standalone: true,
})
export class DiceComponent {
  @Input() id = '0';
  @Input() @HostBinding('attr.data-value') value = 0;

  @HostBinding('class.fixed') fixed = false;


  @HostListener('click') click(): void {
    this.fixed = !this.fixed;
  }
}
