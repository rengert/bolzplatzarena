import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { professions } from '../../../libraries/professions';
import { Profession } from '../../../models/profession.model';

@Injectable({ providedIn: 'root' })
export class ProfessionService {
  get$(): Observable<Profession[]> {
    return of(professions);
  }
}
