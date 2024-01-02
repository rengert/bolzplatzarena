import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { CoreModule } from '@bpa/core';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from '../../../../../services/storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf,
    RouterLink,
    TranslateModule,
    CoreModule,
  ],
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
