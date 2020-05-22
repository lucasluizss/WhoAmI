import { SwUpdate } from '@angular/service-worker';
import { ModeByTime, ModeTimeByWord, ModeNumberOfWords, Mode } from './mode.model';
import database from '../../data/database.json';
declare var UIkit: any;
export class Configuration {

	constructor() {
		this.Load();
	}

	public soundEnabled: boolean;
	public gameMode: Mode;
	public losePointsWhenWrong: boolean;
	public modeByTime: ModeByTime;
	public modeTimeByWord: ModeTimeByWord;
	public modeNumberOfWords: ModeNumberOfWords;

	public get IsModeByTime(): boolean {
		return +this.gameMode === Mode.ModeByTime;
	}

	public get IsModeNumberOfWords(): boolean {
		return +this.gameMode === Mode.ModeNumberOfWords;
	}

	public get IsModeTimeByWord(): boolean {
		return +this.gameMode === Mode.ModeTimeByWord;
	}

	public get SecoundsPerWord(): number {
		return Math.round((this.modeTimeByWord.time / 1000) * 100) / 100;
	}

	public get SecoundsOfGame(): number {
		return Math.round((this.modeByTime.time / 1000) * 100) / 100;
	}

	private Load(): void {
		const configuration = JSON.parse(localStorage.getItem('settings')) as Configuration;

		this.soundEnabled = configuration.soundEnabled;
		this.gameMode = configuration.gameMode;
		this.losePointsWhenWrong = configuration.losePointsWhenWrong;
		this.modeByTime = configuration.modeByTime;
		this.modeTimeByWord = configuration.modeTimeByWord;
		this.modeNumberOfWords = configuration.modeNumberOfWords;
	}

	public Set(
		soundEnabled: boolean,
		gameMode: Mode,
		losePointsWhenWrong: boolean,
		modeByTime: ModeByTime,
		modeTimeByWord: ModeTimeByWord,
		modeNumberOfWords: ModeNumberOfWords
	): void {
		const configuration = new Configuration();

		this.soundEnabled = configuration.soundEnabled = soundEnabled;
		this.gameMode = configuration.gameMode = gameMode;
		this.losePointsWhenWrong = configuration.losePointsWhenWrong = losePointsWhenWrong;
		this.modeByTime = configuration.modeByTime = modeByTime;
		this.modeTimeByWord = configuration.modeTimeByWord = modeTimeByWord;
		this.modeNumberOfWords = configuration.modeNumberOfWords = modeNumberOfWords;

		localStorage.setItem('settings', JSON.stringify(configuration));
	}

	public Reset(): void {
		const defaultConfig = database.configuration as Configuration;
		localStorage.setItem('settings', JSON.stringify(defaultConfig));
		this.Load();
	}
}
