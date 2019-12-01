import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly state$ = new BehaviorSubject(false);

  constructor() {
  }
}
