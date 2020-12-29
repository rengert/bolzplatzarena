import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-privacy-notice',
  templateUrl: './privacy-notice.component.html',
  styleUrls: ['./privacy-notice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyNoticeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
