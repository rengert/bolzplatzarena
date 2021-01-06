import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tower-update',
  templateUrl: './tower-update.component.html',
  styleUrls: ['./tower-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TowerUpdateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
