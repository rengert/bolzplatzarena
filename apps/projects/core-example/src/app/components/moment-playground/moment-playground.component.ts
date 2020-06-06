import { ChangeDetectionStrategy, Component } from '@angular/core';
import moment from 'moment';
import { addDays } from '../../../../../core/src/lib/utils/date.util';

@Component({
  selector: 'app-moment-playground',
  templateUrl: './moment-playground.component.html',
  styleUrls: ['./moment-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MomentPlaygroundComponent {
  timeMoment: number;
  timeDates: number;
  timeNative: number;

  timeAddDaysMoment: number;
  timeAddDaysDates: number;

  private readonly loop = 100000;

  runIsBefore(): void {
    const start = new Date().getTime();
    let text = '';
    for (let i = 0; i < this.loop; i++) {
      text += (moment('2011-01-01T12:12:12.123')
        .isBefore('2010-01-01T12:12:12.123'));
    }
    this.timeMoment = new Date().getTime() - start;
    console.log(text);

    const startNative = new Date().getTime();
    text = '';
    for (let i = 0; i < this.loop; i++) {
      text += ('2012-01-01T12:12:12.123' < '2010-01-01T12:12:12.123').toString();
    }
    this.timeNative = new Date().getTime() - startNative;
    console.log(text);

    const startDates = new Date().getTime();
    text = '';
    for (let i = 0; i < this.loop; i++) {
      text += new Date('2012-01-01T12:12:12.123').getTime() < new Date('2010-01-01T12:12:12.123').getTime();
    }
    this.timeDates = new Date().getTime() - startDates;
    console.log(text);
  }

  runAddDays(): void {
    const start = new Date().getTime();
    let text = '';
    for (let i = 0; i < this.loop; i++) {
      text += (moment('2011-01-01T12:12:12.123')
        .add(i, 'd')).format('YYYY-MM-DD HH:mm');
    }
    this.timeAddDaysMoment = new Date().getTime() - start;
    console.log(text);

    const startDates = new Date().getTime();
    text = '';
    for (let i = 0; i < this.loop; i++) {
      text += addDays(new Date('2011-01-01T12:12:12.123'), i);
    }
    this.timeAddDaysDates = new Date().getTime() - startDates;
    console.log(text);
  }
}
