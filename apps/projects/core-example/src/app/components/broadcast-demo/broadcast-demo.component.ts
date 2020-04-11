import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-broadcast-demo',
  templateUrl: './broadcast-demo.component.html',
  styleUrls: ['./broadcast-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BroadcastDemoComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
