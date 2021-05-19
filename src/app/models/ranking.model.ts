import { Result } from './result.model';

export class Ranking {
	private static scoreSorting = (previousRanking: Result, currentRanking: Result): number => {
		if (previousRanking.score < currentRanking.score) {
			return 1;
		} else if (currentRanking.score < previousRanking.score) {
			return -1;
		}

		return 0;
	}

	public static addResult(result: Result): void {
		const ranking = this.value();
		const index = ranking.findIndex((r) => r.player === result.player);

		result.score = result.scoreTotal;

		if (index > -1) {
			ranking[index] = result;
		} else {
			ranking.push(result);
		}

		ranking.sort(this.scoreSorting);

		localStorage.setItem('ranking', JSON.stringify(ranking));
	}

	public static reset(): void {
		localStorage.removeItem('ranking');
	}

	public static value(): Array<Result> {
		return JSON.parse(localStorage.getItem('ranking')) || ([] as Array<Result>);
	}
}
