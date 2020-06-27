import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { maxBy, minBy } from 'lodash';
import { BehaviorSubject } from 'rxjs';

export interface Scenario {
  name: string;

  method(): void;
}

export interface Test {
  name: string;
  scenarios: Scenario[];
  loop?: number;
}

interface TestResult extends Test {
  max: number;
  min: number;
  results: Result[];
}

interface Result extends Scenario {
  result: number;
}

@Component({
  selector: 'app-performance-test',
  templateUrl: './performance-test.component.html',
  styleUrls: ['./performance-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceTestComponent implements OnChanges {
  @Input() test: Test;
  @Input() loop: number;

  testResult: TestResult;
  readonly running = new BehaviorSubject<boolean>(false);

  ngOnChanges(): void {
    this.testResult = this.getResults();
  }

  runTest(): void {
    this.running.next(true);
    setTimeout(() => {
      this.testResult = this.getResults(true);
      this.running.next(false);
    }, 1000);
  }

  trackByFn(index: number, item: Result): string {
    return item.name;
  }

  private getResults(run = false): TestResult {
    const results = this.test.scenarios.map(
      scenario => ({
        ...scenario,
        result: run ? this.runScenario(scenario) : 0,
      }),
    );

    return {
      ...this.test,
      loop: this.test.loop ?? this.loop,
      results,
      min: minBy(results, result => result.result)?.result ?? 0,
      max: maxBy(results, result => result.result)?.result ?? 0,
    };
  }

  private runScenario(scenario: Scenario): number {
    const start = new Date().getTime();
    for (let i = 0; i < (this.test.loop ?? this.loop); i++) {
      scenario.method();
    }

    return new Date().getTime() - start;
  }
}
