import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Test } from './performance-test/performance-test.component';
import { createMomentTest } from './performance-tests/moment';
import { pullWithAllTest } from './performance-tests/pull-with';
import { someTest } from './performance-tests/some';

@Component({
  selector: 'app-performance-check',
  templateUrl: './performance-check.component.html',
  styleUrls: ['./performance-check.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceCheckComponent {
  readonly tests: Test[] = [
    createMomentTest,
    pullWithAllTest,
    someTest,
  ];
}
