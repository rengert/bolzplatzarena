import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { levels } from '../../../libraries/levels';
import { professions } from '../../../libraries/professions';
import { Level } from '../../../models/level.model';
import { Profession } from '../../../models/profession.model';

@Injectable({ providedIn: 'root' })
export class ProfessionService {
  get$(): Observable<Profession[]> {
    return of(professions);
  }

  getLevels$(): Observable<Level[]> {
    return of(levels);
  }
}
