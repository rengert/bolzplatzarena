import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-privacy-notice',
  templateUrl: './privacy-notice.component.html',
  styleUrls: ['./privacy-notice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyNoticeComponent {
}
