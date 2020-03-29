import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html'
})
export class RankingComponent implements OnInit {

  public players: any = [];

  constructor() { }

  ngOnInit() {
  }

}
