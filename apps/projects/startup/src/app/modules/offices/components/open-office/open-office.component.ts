import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-open-office',
  templateUrl: './open-office.component.html',
  styleUrls: ['./open-office.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpenOfficeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
