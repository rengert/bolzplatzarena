import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StorageService } from '../../../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  gameStarted: boolean;

  constructor(
    private readonly storage: StorageService,
    private readonly router: Router,
  ) {
  }

  ngOnInit() {
    this.gameStarted = !!this.storage.loadGame();
  }

  newGame() {
    this.storage.cleanGame();
    this.router.navigate(['game']);
  }
}
