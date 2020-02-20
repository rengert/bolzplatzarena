import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Statistic } from '../../../../models/statistic.model';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  statistics$: Promise<Statistic[]>;
  displayedColumns: string[] = ['name', 'value'];

  constructor(private readonly dataService: DataService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.statistics$ = this.dataService.getStatistics()
      .then(
        statistics => statistics.map(item => ({ ...item, name: item.name.toUpperCase() })),
      );
  }

  async reset(): Promise<void> {
    await this.dataService.cleanUp();
    await this.router.navigate(['/home']);
  }
}
