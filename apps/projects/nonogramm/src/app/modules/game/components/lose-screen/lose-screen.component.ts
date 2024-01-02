import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

@Component({
    selector: 'app-lose-screen',
    templateUrl: './lose-screen.component.html',
    styleUrls: ['./lose-screen.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatDialogTitle,
        TranslateModule,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
    ],
})
export class LoseScreenComponent {
}
