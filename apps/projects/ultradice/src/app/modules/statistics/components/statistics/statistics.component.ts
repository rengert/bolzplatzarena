import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Statistic } from '../../../../models/statistic.model';
import { DataService } from '../../../../services/data.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { LinkButtonComponent } from '../../../shared/components/link-button/link-button.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatTableModule,
    ButtonComponent,
    LinkButtonComponent,
    TranslateModule,
  ],
})
export class StatisticsComponent {
  protected readonly statistics$: Observable<Statistic[]>;
  protected readonly displayedColumns: string[] = ['name', 'value'];

  constructor(
    private readonly dataService: DataService,
    private readonly router: Router,
  ) {
    this.statistics$ = this.dataService.getStatistics$()
      .pipe(
        map(statistics => statistics.map(item => ({ ...item, name: item.name.toUpperCase() }))),
      );
  }

  protected async reset(): Promise<void> {
    await this.dataService.cleanUp();
    await this.router.navigate(['/home']);
  }
}
