import { Result } from './result.model';

export class Ranking {
	public static addResult(result: Result): void {
		const ranking = this.value();
		const index = ranking.findIndex(r => r.player === result.player);

		result.score = result.scoreTotal;

		if (index > -1) {
			ranking[index] = result;
		} else {
			ranking.push(result);
		}

		ranking.sort((a, b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));

		localStorage.setItem('ranking', JSON.stringify(ranking));
	}

	public static reset(): void {
		localStorage.removeItem('ranking');
	}

	public static value(): Array<Result> {
		return JSON.parse(localStorage.getItem('ranking')) || [] as Array<Result>;
	}
}
