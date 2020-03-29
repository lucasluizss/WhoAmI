import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html'
})
export class RankingComponent implements OnInit {

  public rankingList: any = [];

  constructor() { }

  ngOnInit() {
    const list = JSON.parse(localStorage.getItem('ranking'));

    list.sort((a, b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));

    this.rankingList = list;
  }

}
