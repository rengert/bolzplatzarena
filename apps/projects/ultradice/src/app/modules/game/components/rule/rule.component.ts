import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {
  @Input()
  text: string;
  @Input()
  value?: number;
  constructor() { }

  ngOnInit() {
  }

}
