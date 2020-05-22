export class ModeByTime {
	constructor(time: number) {
		this.time = time;
	}

	public time: number;
}

export class ModeTimeByWord {
	constructor(time: number, numberOfWords: number) {
		this.time = time;
		this.numberOfWords = numberOfWords;
	}

	public time: number;
	public numberOfWords: number;
}

export class ModeNumberOfWords {
	constructor(numberOfWord: number) {
		this.numberOfWords = numberOfWord;
	}

	public numberOfWords: number;
}

export enum Mode {
	ModeByTime,
	ModeTimeByWord,
	ModeNumberOfWords
}
