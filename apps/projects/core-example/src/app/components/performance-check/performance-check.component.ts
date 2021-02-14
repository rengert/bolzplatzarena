import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Test } from './performance-test/performance-test.component';
import { forTest } from './performance-tests/for';
import { keyByTest } from './performance-tests/key-by';
import { createMomentTest } from './performance-tests/moment';
import { pullWithAllTest } from './performance-tests/pull-with';
import { reduceTest } from './performance-tests/reduce';
import { someTest } from './performance-tests/some';
import { duplicateArrayTest } from './performance-tests/spread';
import { uniqueTest } from './performance-tests/unique';

@Component({
  selector: 'app-performance-check',
  templateUrl: './performance-check.component.html',
  styleUrls: ['./performance-check.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceCheckComponent {
  @HostBinding('class.print') private printMode = false;

  readonly tests: Test[] = [
    createMomentTest,
    pullWithAllTest,
    someTest,
    forTest,
    reduceTest,
    uniqueTest,
    keyByTest,
    duplicateArrayTest,
  ];

  trackByFn(index: number): number {
    return index;
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

  async captureScreen(retry = 0): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    try {
      this.printMode = true;
      const data = document.getElementsByClassName('captureScreen');
      let page = pdf;
      for (let i = 0; i < data.length; i++) {
        await html2canvas(data[i] as HTMLElement).then(canvas => {
          // Few necessary setting options
          const imgWidth = 208;
          const imgHeight = canvas.height * imgWidth / canvas.width;
          const contentDataURL = canvas.toDataURL('image/png');
          if (i > 0) {
            page = pdf.addPage();
          }
          page.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        });
      }
      this.printMode = false;
    } catch {
      console.error('fehlerhaft');
      if (retry < 5) {
        this.captureScreen(retry + 1);
        return;
      }
      alert('hier geht nichts mehr');
    }
    await pdf.save('MYPdf.pdf'); // Generated PDF
  }
}
