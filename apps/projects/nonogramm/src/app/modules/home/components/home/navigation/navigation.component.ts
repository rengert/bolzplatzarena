import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../../../services/storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '../../../../../../../../core/src/lib/core.module';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CoreModule,
        MatButtonModule,
        NgIf,
        RouterLink,
        TranslateModule,
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
