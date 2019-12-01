import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../../services/data.service';
import {GameService} from '../../../../services/game.service';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

  constructor(readonly service: DataService, readonly gameService: GameService) {
  }

  ngOnInit() {
  }

  click() {
    this.service.cleanUp();
  }

  click2() {
    this.gameService.state$.next(false);
  }
}
