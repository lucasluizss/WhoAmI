import { Component, OnInit } from '@angular/core';

import { Result } from '@models/result.model';
import { Ranking } from '@models/ranking.model';

@Component({
	selector: 'app-ranking',
	templateUrl: './ranking.component.html'
})
export class RankingComponent implements OnInit {

	public rankingList: Array<Result>;

	ngOnInit() {
		this.rankingList = Ranking.value();
	}
}
