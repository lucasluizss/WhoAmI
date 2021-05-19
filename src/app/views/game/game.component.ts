import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { GameViewModel } from './game.model';
import { Mode } from '@models/mode.model';
import { Game } from '@models/game.model';
import { Result } from '@models/result.model';
import { Ranking } from '@models/ranking.model';
import { Historic } from '@models/historic.model';
import { Configuration } from '@models/configuration.model';
declare var UIkit: any;

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

	@ViewChild('audioSuccess', {}) audioSuccess: ElementRef;
	@ViewChild('audioError', {}) audioError: ElementRef;
	@ViewChild('audioFinalGame', {}) audioFinalGame: ElementRef;

	public game = new Game();
	public vm = new GameViewModel();
	private settings: Configuration;

	constructor(private activatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
		this.settings = new Configuration();
		this.configureSound();

		this.activatedRoute.queryParams.subscribe(params => {
			const categoryId = +params.id;
			this.game.setCategory(categoryId);
		});

		this.whoIsPlaying();
	}

	public get secoundsOfGame(): number {
		return Math.round((this.settings.modeByTime.time / 1000) * 100) / 100;
	}

	private whoIsPlaying(): void {
		UIkit.modal.prompt('Digite seu nome:', '').then((name: string) => {
			this.game.setPlayer(name);
			this.notificate(`Vamos jogar ${this.game.player}`);

			this.play();
		});
	}

	public play(): void {
		this.audioFinalGame.nativeElement.pause();
		this.game.clearHistoric();
		this.vm.loadWords(this.game.category.data);

		const self = this;
		this.vm.start().subscribe({
			complete() {
				self.callGameByMode();
			}
		});
	}

	private callGameByMode(): void {
		const self = this;

		switch (this.settings.gameMode) {
			case Mode.ByTime:
				this.vm.playByTime(this.secoundsOfGame).subscribe({ complete() { self.saveScoreResult(); } });
				break;
			case Mode.NumberOfWords:
				this.vm.playByNumberOfWords(this.settings.modeNumberOfWords.numberOfWords);
				break;
			case Mode.TimeByWord:
				this.playTimePerWords();
				break;
			default:
				this.notificate('Este modo de jogo não existe!', 'warning', 10);
				break;
		}
	}

	private playTimePerWords(): void {
		const self = this;

		this.vm.playTimeByWord(this.settings.modeTimeByWord.numberOfWords, +this.settings.modeTimeByWord.time).subscribe({
			next(historic) {
				self.game.AddHistoric(historic as Historic);
			},
			complete() {
				self.computeResult();
			}
		});
	}

	private rightAnswer(): void {
		this.notificate('Acertou!', 'success', 0.8);
		this.game.rightAnswer(this.vm.word);
	}

	private incorrectAnswer(): void {
		this.notificate('Errou!', 'danger', 0.8);
		this.game.incorrectAnswer(this.vm.word, this.settings.losePointsWhenWrong);
	}

	private computeResult(): void {
		UIkit.modal.prompt('Pontuação:', '').then((score: string | number) => {
			this.game.score = +score || -1;
			this.saveScoreResult();
		});
	}

	private saveScoreResult() {
		if (this.settings.soundEnabled) { this.audioFinalGame.nativeElement.play(); }
		this.vm.isPlayerAddict = this.game.isPlayerAddict();

		Ranking.addResult(new Result(this.game.player, this.game.score));

		this.vm.finished();
	}

	private notificate(message: string, status: string = 'primary', timeout = 3): void {
		this.checkNotificationSound(status);

		UIkit.notification({
			message,
			status,
			pos: 'bottom-center',
			timeout: timeout * 1000
		});
	}

	private checkNotificationSound(status: string) {
		if (this.settings.soundEnabled) {
			if (status === 'success') {
				this.audioSuccess.nativeElement.play();
			}

			if (status === 'danger') {
				this.audioError.nativeElement.play();
			}
		}
	}

	public onClick(e: any): void {
		const clickTarget = e.target;
		const clickTargetWidth = clickTarget.offsetWidth;
		const xCoordInClickTarget = e.clientX - clickTarget.getBoundingClientRect().left;

		if (!this.vm.CanClick || this.settings.gameMode === Mode.TimeByWord) { return; }

		if (!this.vm.HasWords || this.vm.currentProgress <= 0) {
			this.saveScoreResult();
			return;
		}

		if (this.settings.gameMode === Mode.NumberOfWords) {
			--this.vm.currentProgress;
		}

		this.checkAnswer(clickTargetWidth, xCoordInClickTarget);
	}

	private checkAnswer(clickTargetWidth: number, xCoordInClickTarget: number): void {
		if (clickTargetWidth / 2 > xCoordInClickTarget) {
			this.rightAnswer();
		}
		else {
			this.incorrectAnswer();
		}

		this.vm.nextWord();
	}

	public configureSound(): void {
		document.querySelectorAll('video, audio').forEach((elem: HTMLAudioElement) => {
			elem.muted = !this.settings.soundEnabled;

			if (!this.settings.soundEnabled) {
				elem.pause();
			}
		});
	}
}
