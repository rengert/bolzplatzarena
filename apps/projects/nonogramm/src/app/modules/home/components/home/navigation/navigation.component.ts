import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../../../services/storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {
  gameStarted: boolean;

  constructor(
    private readonly storage: StorageService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.gameStarted = !!this.storage.loadGame();
  }

  async newGame(): Promise<void> {
    this.storage.cleanGame();
    await this.router.navigate(['game']);
  }
}
