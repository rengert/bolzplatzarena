import { ChangeDetectionStrategy, Component } from '@angular/core';
import jsPDF from 'jspdf';
import moment from 'moment';
import { addDays } from 'projects/core/src/projects';

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

  timeCloneMoment: number;
  timeCloneDates: number;

  timeCreateMoment: number;
  timeCreateDates: number;
  timeCreateMomentWithDate: number;

  readonly loop = 100000;

  runIsBefore(): void {
    const start = new Date().getTime();
    const date = moment('2011-01-01T12:12:12.123');
    const second = moment('2010-01-01T12:12:12.123');
    for (let i = 0; i < this.loop; i++) {
      const data = date.isBefore(second);
    }
    this.timeMoment = new Date().getTime() - start;

    const startNative = new Date().getTime();
    for (let i = 0; i < this.loop; i++) {
      const data = '2012-01-01T12:12:12.123'.localeCompare('2010-01-01T12:12:12.123') < 0;
    }
    this.timeNative = new Date().getTime() - startNative;

    const startDates = new Date().getTime();
    const dateObj = new Date('2012-01-01T12:12:12.123').getTime();
    for (let i = 0; i < this.loop; i++) {
      const data = dateObj < new Date('2010-01-01T12:12:12.123').getTime();
    }
    this.timeDates = new Date().getTime() - startDates;
  }

  runAddDays(): void {
    const start = new Date().getTime();
    const date = moment('2011-01-01T12:12:12.123');
    for (let i = 0; i < this.loop; i++) {
      date.add(i, 'd');
    }
    this.timeAddDaysMoment = new Date().getTime() - start;

    const startDates = new Date().getTime();
    const dateObject = new Date('2011-01-01T12:12:12.123');
    for (let i = 0; i < this.loop; i++) {
      addDays(dateObject, i);
    }
    this.timeAddDaysDates = new Date().getTime() - startDates;
  }

  runClone(): void {
    const start = new Date().getTime();
    const data = moment('2011-01-01T12:12:12.123');
    for (let i = 0; i < this.loop; i++) {
      const clone = data.clone();
    }
    this.timeCloneMoment = new Date().getTime() - start;

    const startDates = new Date().getTime();
    const date = new Date('2011-01-01T12:12:12.123');
    for (let i = 0; i < this.loop; i++) {
      const clone = new Date(date.getTime());
    }
    this.timeCloneDates = new Date().getTime() - startDates;
  }

  runCreate(): void {
    const start = new Date().getTime();
    for (let i = 0; i < this.loop; i++) {
      const data = moment('2011-01-01T12:12:12.123');
    }
    this.timeCreateMoment = new Date().getTime() - start;

    const startDates = new Date().getTime();
    for (let i = 0; i < this.loop; i++) {
      const date = new Date('2011-01-01T12:12:12.123');
    }
    this.timeCreateDates = new Date().getTime() - startDates;

    const startBoth = new Date().getTime();
    for (let i = 0; i < this.loop; i++) {
      const data = moment(new Date('2011-01-01T12:12:12.123'));
    }
    this.timeCreateMomentWithDate = new Date().getTime() - startBoth;
  }

  async print(): Promise<void> {
    const doc = new jsPDF('p', 'pt', 'a4');

    const div = window.document.createElement('div');
    const style = window.document.getElementsByTagName('style');
    for (let x = 0; x < style.length; x++) {
      div.appendChild(style[x]);
    }
    div.appendChild(await window.document.getElementsByTagName('main')[0]);
    await doc.html(div);
    doc.save('test.pdf');
    doc.output('dataurlnewwindow');
  }
}
