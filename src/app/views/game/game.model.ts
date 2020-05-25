import { Historic } from './../../models/historic.model';
import { Observable } from 'rxjs';

export class GameViewModel {
	public isPlayerAddict: boolean;
	public again: boolean;
	public word: string;
	public maxProgress = 0;
	public currentProgress = 0;
	public words: Array<string>;
	private interrupted: boolean;

	public Finished(): void {
		this.again = true;
		this.word = '';
	}

	public Stop(): void {
		this.interrupted = true;
	}

	public NextWord(): void {
		this.word = this.words[Math.floor(Math.random() * this.words.length)];
		this.words = this.words.filter(w => w !== this.word);
	}

	public LoadWords(words: string[]): void {
		this.words = words || [];
	}

	public get CanClick(): boolean {
		return this.again !== undefined;
	}

	public get HasWords(): boolean {
		return this.words && this.words.length > 0 || this.words.length === 0 && !!this.word;
	}

	public Start(): Observable<void> {
		return new Observable(subscriber => {
			const arr = ['Prepare-se!', '3', '2', '1'];
			let startCounter = arr.length;

			const interval = setInterval(() => {
				this.word = arr.shift();

				if (!startCounter--) {
					clearInterval(interval);
					this.again = false;
					subscriber.complete();
				}
			}, 1000);
		});
	}

	public PlayByTime(secoundsOfGame: number): Observable<void> {
		this.currentProgress = this.maxProgress = secoundsOfGame;

		return new Observable((subscribe) => {
			this.NextWord();

			const interval = setInterval(() => {
				if (--this.currentProgress <= 0) {
					clearInterval(interval);
					subscribe.complete();
				}

				if (this.interrupted) {
					subscribe.unsubscribe();
				}
			}, 1000);
		});
	}

	public PlayByNumberOfWords(numberOfWords: number): void {
		this.currentProgress = this.maxProgress = numberOfWords;
		this.NextWord();
	}

	public PlayTimeByWord(numberOfWords: number, timeByWord: number): Observable<Historic> {
		this.currentProgress = this.maxProgress = numberOfWords;

		return new Observable((subscribe) => {
			this.NextWord();
			subscribe.next(new Historic(this.word, true));

			const interval = setInterval(() => {
				if (!this.HasWords || !this.currentProgress--) {
					clearInterval(interval);
					this.Finished();
					subscribe.complete();
				}

				if (this.interrupted) {
					subscribe.unsubscribe();
				}

				this.NextWord();
				subscribe.next(new Historic(this.word, true));

			}, timeByWord);
		});
	}
}
