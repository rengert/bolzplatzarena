import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { cities } from '../../../libraries/cities';
import { City } from '../../../models/city.model';

@Injectable({ providedIn: 'root' })
export class StaticDataService {
  getCities$(): Observable<City[]> {
    return of(cities);
  }
}
