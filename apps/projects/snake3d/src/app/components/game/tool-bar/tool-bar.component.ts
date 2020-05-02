import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolBarComponent implements OnInit {
  result$: Observable<any>;

  constructor(
    private readonly game: GameService,
    private readonly changeDetectionRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.result$ = this.game.result$.pipe(
      tap(() => this.changeDetectionRef.detectChanges()),
    );
  }
}
