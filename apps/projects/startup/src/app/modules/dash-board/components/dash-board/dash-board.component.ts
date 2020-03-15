import { Component, OnInit } from '@angular/core';

interface Clickable {
  name: string;
  active: boolean;
  children?: Clickable[];
}

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
})
export class DashBoardComponent implements OnInit {
  items: Clickable[][] = [];

  ngOnInit(): void {
    this.items[0] = [
      {
        name: 'TRB 1', active: false, children: [
          { name: 'TRB 1', active: false },
          { name: 'ELT 1', active: false },
          { name: 'MAL 1', active: false },
          { name: 'EST 1', active: false },
        ],
      },
      { name: 'MAL 2', active: false },
      { name: 'MAL 3', active: false },
      { name: 'ELT 2', active: false },
      { name: 'ELT 3', active: false },
    ];
    this.items[1] = [
      { name: 'MAL 1', active: false },
      { name: 'MAL 2', active: false },
      {
        name: 'sss',
        active: false,
        children: [
          { name: 'ELT 1', active: false },
          { name: 'TRB 1', active: false },
        ],
      },
      { name: 'ELT 2', active: false },
      { name: 'MAL 2', active: false },
    ];
    this.items[2] = [
      { name: 'ELT 1', active: false },
      { name: 'ELT 2', active: false },
      {
        name: 'sss',
        active: false,
        children: [
          { name: 'MAL 1', active: false },
          { name: 'TRB 1', active: false },
          { name: 'FAS 1', active: false },
        ],
      },
      { name: 'MAL 1', active: false },
      { name: 'MAL 2', active: false },
    ];
  }

  trackByFn(index: number, item: Clickable[]): string {
    return index.toString();
  }
}
