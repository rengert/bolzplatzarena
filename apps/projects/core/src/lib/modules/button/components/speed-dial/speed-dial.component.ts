import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SpeedDialService } from '../../services/speed-dial.service';

export interface Button {
  key: string;
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
export class SpeedDialComponent implements OnInit {
  buttons$: Observable<Button[]>;
  fabTogglerState = 'inactive';
  hasButtons = false;
  private readonly state = new BehaviorSubject<boolean>(false);

  constructor(private readonly speedDial: SpeedDialService) {
  }

  ngOnInit(): void {
    this.buttons$ = this.speedDial.items$()
      .pipe(
        tap(_ => this.state.next(false)),
        tap(buttons => this.hasButtons = !!buttons.length),
        switchMap(buttons => this.state.pipe(
          map(active => active ? buttons : []),
        )),
      );
  }

  showItems(): void {
    this.fabTogglerState = 'active';
    this.state.next(true);
  }

  hideItems(): void {
    this.fabTogglerState = 'inactive';
    this.state.next(false);
  }

  onToggleFab(): void {
    this.state.next(!this.state.value);
  }
}
