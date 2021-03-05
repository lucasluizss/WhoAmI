import { Observable } from 'rxjs';

import { Historic } from '@models/historic.model';

export class GameViewModel {
	public isPlayerAddict: boolean;
	public again: boolean;
	public word: string;
	public maxProgress = 0;
	public currentProgress = 0;
	public words: Array<string>;
	private interrupted: boolean;

	public finished(): void {
		this.again = true;
		this.word = '';
	}

	public stop(): void {
		this.interrupted = true;
	}

	public nextWord(): void {
		this.word = this.words[Math.floor(Math.random() * this.words.length)];
		this.words = this.words.filter(w => w !== this.word);
	}

	public loadWords(words: string[]): void {
		this.words = words || [];
	}

	public get CanClick(): boolean {
		return this.again !== undefined;
	}

	public get HasWords(): boolean {
		return this.words && this.words.length > 0 || this.words.length === 0 && !!this.word;
	}

	public start(): Observable<void> {
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

	public playByTime(secoundsOfGame: number): Observable<void> {
		this.currentProgress = this.maxProgress = secoundsOfGame;

		return new Observable((subscribe) => {
			this.nextWord();

			const interval = setInterval(() => {
				if (--this.currentProgress <= 0) {
					clearInterval(interval);
					subscribe.complete();
				}

				if (this.interrupted) {
					clearInterval(interval);
					subscribe.unsubscribe();
				}
			}, 1000);
		});
	}

	public playByNumberOfWords(numberOfWords: number): void {
		this.currentProgress = this.maxProgress = numberOfWords;
		this.nextWord();
	}

	public playTimeByWord(numberOfWords: number, timeByWord: number): Observable<Historic> {
		this.currentProgress = this.maxProgress = numberOfWords;

		return new Observable((subscribe) => {
			this.nextWord();
			subscribe.next(new Historic(this.word, true));

			const interval = setInterval(() => {
				if (!this.HasWords || !this.currentProgress--) {
					clearInterval(interval);
					this.finished();
					subscribe.complete();
				}

				if (this.interrupted) {
					clearInterval(interval);
					subscribe.unsubscribe();
				}

				this.nextWord();
				subscribe.next(new Historic(this.word, true));

			}, timeByWord);
		});
	}
}
