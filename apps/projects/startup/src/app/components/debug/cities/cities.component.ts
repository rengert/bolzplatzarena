import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../../../models/city.model';
import { StaticDataService } from '../../../modules/base/services/static-data.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesComponent implements OnInit {
  readonly position = {
    latitude: 49.0159405,
    longitude: 8.3394945,
  };
  readonly columns = ['name', 'costFactor', 'distance'];
  data$: Observable<City[]>;

  constructor(private readonly staticData: StaticDataService) {
  }

  ngOnInit(): void {
    this.data$ = this.staticData.getCities$();
  }
}
