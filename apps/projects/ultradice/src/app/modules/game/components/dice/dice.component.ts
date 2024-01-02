import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiceComponent {
  @Input({ required: true }) id: string;
  @Input() @HostBinding('attr.data-value') value = 0;

  @HostBinding('class.fixed') fixed = false;


  @HostListener('click')
  protected click(): void {
    this.fixed = !this.fixed;
  }
}
