import { ModeByTime, ModeTimeByWord, ModeNumberOfWords, Mode } from './mode.model';
import database from '../../data/database.json';
declare var UIkit: any;
export class Configuration {

	constructor() {
		this.load();
	}

	public soundEnabled: boolean;
	public gameMode: Mode;
	public losePointsWhenWrong: boolean;
	public modeByTime: ModeByTime;
	public modeTimeByWord: ModeTimeByWord;
	public modeNumberOfWords: ModeNumberOfWords;

	public get isModeByTime(): boolean {
		return +this.gameMode === Mode.ByTime;
	}

	public get isModeNumberOfWords(): boolean {
		return +this.gameMode === Mode.NumberOfWords;
	}

	public get isModeTimeByWord(): boolean {
		return +this.gameMode === Mode.TimeByWord;
	}

	public get secoundsPerWord(): number {
		return Math.round((this.modeTimeByWord.time / 1000) * 100) / 100;
	}

	public get secoundsOfGame(): number {
		return Math.round((this.modeByTime.time / 1000) * 100) / 100;
	}

	private load(): void {
		const configuration = JSON.parse(localStorage.getItem('settings')) as Configuration;

		this.soundEnabled = configuration.soundEnabled;
		this.gameMode = configuration.gameMode;
		this.losePointsWhenWrong = configuration.losePointsWhenWrong;
		this.modeByTime = configuration.modeByTime;
		this.modeTimeByWord = configuration.modeTimeByWord;
		this.modeNumberOfWords = configuration.modeNumberOfWords;
	}

	public set(
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
		this.load();
	}
}
