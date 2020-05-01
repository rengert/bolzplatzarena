import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Direction } from '../../../../../snake/src/app/app.constants';
import { EngineService } from '../../services/engine.service';
import { GameService } from '../../services/game.service';
import { PrivacyComponent } from '../privacy/privacy.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('rendererCanvas', { static: true }) private readonly rendererCanvas: ElementRef<HTMLCanvasElement>;

  private subscription = Subscription.EMPTY;

  constructor(
    private readonly engine: EngineService,
    private readonly game: GameService,
    private readonly dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.game.result$.pipe(
      filter(result => result.lost),
    )
      .subscribe(() => {
        this.loseGame();
      });
  }

  ngAfterViewInit(): void {
    this.game.init(this.rendererCanvas);
    this.engine.animate();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:keydown', ['$event']) handleKeyboardEvents(e: KeyboardEvent): void {
    this.handleDirection(e.key as Direction);
  }

  handleDirection(direction: Direction): void {
    this.game.setDirection(direction);
  }

  private loseGame(): void {

    const dialogRef = this.dialog.open(PrivacyComponent, {
      width: '250px',
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log('The dialog was closed');
      });

    return;
  }
}
