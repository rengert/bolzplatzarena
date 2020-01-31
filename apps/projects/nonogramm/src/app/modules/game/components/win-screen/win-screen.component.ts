import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-win-screen',
  templateUrl: './win-screen.component.html',
  styleUrls: ['./win-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WinScreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
