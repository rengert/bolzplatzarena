import {DataService} from './../../../../services/data.service';
import {Component, OnInit} from '@angular/core';
import {Statistic} from '../../../../models/statistic.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  statistics$: Promise<Statistic[]>;
  displayedColumns: string[] = ['name', 'value'];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.statistics$ = this.dataService.getStatistics();
  }
}
