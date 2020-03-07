import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface Button {
  icon: string;
  route: string[];
}

const speedDialFabAnimations = [
  trigger('fabToggler', [
    state('inactive', style({
      transform: 'rotate(0deg)',
    })),
    state('active', style({
      transform: 'rotate(225deg)',
    })),
    transition('* <=> *', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ]),
  trigger('speedDialStagger', [
    transition('* => *', [

      query(':enter', style({ opacity: 0 }), { optional: true }),

      query(':enter', stagger('40ms',
        [
          animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
            keyframes(
              [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                style({ opacity: 1, transform: 'translateY(0)' }),
              ],
            ),
          ),
        ],
      ), { optional: true }),

      query(':leave',
        animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          keyframes([
            style({ opacity: 1 }),
            style({ opacity: 0 }),
          ]),
        ), { optional: true },
      ),

    ]),
  ]),
];

@Component({
  selector: 'bpa-speed-dial',
  templateUrl: './speed-dial.component.html',
  styleUrls: ['./speed-dial.component.scss'],
  animations: speedDialFabAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeedDialComponent {
  fabButtons: Button[] = [
    {
      icon: 'timeline',
      route: ['open-office'],
    },
    {
      icon: 'view_headline',
      route: ['offices'],
    },
  ];
  buttons: Button[] = [];
  fabTogglerState = 'inactive';

  showItems(): void {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems(): void {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab(): void {
    this.buttons.length ? this.hideItems() : this.showItems();
  }
}
