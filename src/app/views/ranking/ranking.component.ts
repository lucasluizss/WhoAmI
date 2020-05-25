import { Ranking } from './../../models/ranking.model';
import { Result } from './../../models/result.model';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-ranking',
	templateUrl: './ranking.component.html'
})
export class RankingComponent implements OnInit {

	public rankingList: Array<Result>;

	constructor() { }

	ngOnInit() {
		this.rankingList = Ranking.Get();
		console.log(this.rankingList);
	}
}
