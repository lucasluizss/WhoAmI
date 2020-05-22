import { Historic } from './historic.model';
import { Category } from './category.model';

export class Game {
	constructor() {
		this.ClearHistoric();
	}

	public player: string;
	public score = 0;
	public category: Category;
	public historic: Array<Historic>;

	public IsPlayerAddict(): boolean {
		return this.score === this.category.data.length;
	}

	public SetPlayer(player: string): void {
		this.player = player || 'Anônimo';
	}

	public SetCategory(categoryId: number): void {
		const categories = JSON.parse(localStorage.getItem('categories')) as Array<Category>;
		this.category = categories.find(x => x.id === categoryId) as Category;
	}

	public IncorrectAnswer(answer: string, losePoints: boolean): void {
		this.AddHistoric(new Historic(answer, false));

		if (this.score > 0 && losePoints) {
			this.score--;
		}
	}

	public RightAnswer(answer: string): void {
		this.AddHistoric(new Historic(answer, true));
		this.score++;
	}

	public ClearHistoric(): void {
		this.score = 0;
		this.historic = new Array<Historic>();
	}

	public AddHistoric(historic: Historic): void {
		this.historic.push(historic);
	}
}
