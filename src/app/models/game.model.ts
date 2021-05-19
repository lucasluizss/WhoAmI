import { Historic } from './historic.model';
import { Category } from './category.model';

export class Game {
	constructor() {
		this.clearHistoric();
	}

	public player: string;
	public score = 0;
	public category: Category;
	public historic: Array<Historic>;

	public isPlayerAddict(): boolean {
		return this.score === this.category.data.length;
	}

	public setPlayer(player: string): void {
		this.player = player || 'Anônimo';
	}

	public setCategory(categoryId: number): void {
		const categories = JSON.parse(
			localStorage.getItem('categories')
		) as Array<Category>;
		this.category = categories.find(x => x.id === categoryId);
	}

	public incorrectAnswer(answer: string, losePoints: boolean): void {
		this.AddHistoric(new Historic(answer, false));

		if (this.score > 0 && losePoints) {
			this.score--;
		}
	}

	public rightAnswer(answer: string): void {
		this.AddHistoric(new Historic(answer, true));
		this.score++;
	}

	public clearHistoric(): void {
		this.score = 0;
		this.historic = new Array<Historic>();
	}

	public AddHistoric(historic: Historic): void {
		this.historic.push(historic);
	}
}
