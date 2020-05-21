import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Direction } from '../../app.constants';
import { EngineService } from '../../services/engine.service';
import { GameService } from '../../services/game.service';
import { LoseScreenComponent } from './lose-screen/lose-screen.component';
import { PauseScreenComponent } from './pause-screen/pause-screen.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('canvasElement', { static: true }) private readonly canvasElement: ElementRef<HTMLCanvasElement>;

  private subscription = Subscription.EMPTY;

  constructor(
    private readonly engine: EngineService,
    private readonly game: GameService,
    private readonly dialog: MatDialog,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly router: Router,
  ) {
    this.game.reset();
  }

  ngOnInit(): void {
    Plugins.App.addListener('backButton', () => {
      this.stopGame();
    });

    this.subscription = this.game.result$.pipe(
      filter(result => result.lost),
    )
      .subscribe(_ => {
        this.loseGame();
        this.changeDetectionRef.detectChanges();
      });
  }

  ngAfterViewInit(): void {
    this.game.init(this.canvasElement);
    this.engine.animate();
  }

  ngOnDestroy(): void {
    Plugins.App.removeAllListeners();

    this.subscription.unsubscribe();
    this.engine.clean();
  }

  @HostListener('window:keydown', ['$event']) handleKeyboardEvents(e: KeyboardEvent): void {
    this.handleDirection(e.key as Direction);

    if (e.key === 'Escape') {
      this.stopGame();
    }
  }

  handleDirection(direction: Direction): void {
    this.game.setDirection(direction);
  }

  private loseGame(): void {
    const dialogRef = this.dialog.open(LoseScreenComponent, {
      width: '1250px',
    });

    dialogRef.afterClosed()
      .subscribe(async result => {
        await this.game.writeScore();

        if (result) {
          this.game.restart();

          return undefined;
        }

        return this.router.navigate(['/']);
      });

    return;
  }

  private stopGame(): void {
    this.game.pause();

    const dialogRef = this.dialog.open(PauseScreenComponent, {
      width: '1250px',
    });

    dialogRef.afterClosed()
      .subscribe(async result => {
        switch (result) {
          case 'stop':
            await this.game.writeScore();
            this.router.navigate(['/']);
            break;
          case 'quit':
            await this.game.writeScore();
            Plugins.App.exitApp();
            break;
          case 'continue':
          default:
            this.game.continue();
            break;
        }
      });
  }
}
