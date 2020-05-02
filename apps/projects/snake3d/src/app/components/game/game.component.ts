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
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Direction } from '../../../../../snake/src/app/app.constants';
import { EngineService } from '../../services/engine.service';
import { GameService } from '../../services/game.service';
import { LoseScreenComponent } from './lose-screen/lose-screen.component';

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
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly router: Router,
  ) {
    this.game.reset();
  }

  ngOnInit(): void {
    this.subscription = this.game.result$.pipe(
      filter(result => result.lost),
    )
      .subscribe(() => {
        this.loseGame();
        this.changeDetectionRef.detectChanges();
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

    const dialogRef = this.dialog.open(LoseScreenComponent, {
      width: '1250px',
    });

    dialogRef.afterClosed()
      .subscribe(async result =>
        this.router.navigate(['/']));

    return;
  }
}
