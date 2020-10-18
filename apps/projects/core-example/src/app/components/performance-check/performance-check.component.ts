import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Test } from './performance-test/performance-test.component';
import { forTest } from './performance-tests/for';
import { keyByTest } from './performance-tests/key-by';
import { createMomentTest } from './performance-tests/moment';
import { createMomentCacheTest } from './performance-tests/moment-cache';
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
  readonly tests: Test[] = [
    createMomentTest,
    pullWithAllTest,
    someTest,
    forTest,
    reduceTest,
    uniqueTest,
    keyByTest,
    duplicateArrayTest,
    createMomentCacheTest,
  ];

  trackByFn(index: number): number {
    return index;
  }
}
