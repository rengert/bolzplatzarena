import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// tslint:disable-next-line:no-import-side-effect
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Highscore } from '../../models/highscore.model';
import { HighscoreService } from '../../services/highscore.service';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighscoreComponent implements OnInit {
  data$: Observable<Highscore[]>;
  highscore$: Observable<Highscore[]>;

  constructor(
    private readonly highscore: HighscoreService,
  ) {
  }

  ngOnInit(): void {
    this.data$ = this.highscore.get$();
    this.highscore$ = this.highscore.getRemote$();
  }
}
