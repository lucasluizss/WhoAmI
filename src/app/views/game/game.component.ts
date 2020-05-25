import { Ranking } from './../../models/ranking.model';
import { GameViewModel } from './game.model';
import { Game } from './../../models/game.model';
import { Historic } from './../../models/historic.model';
import { Result } from './../../models/result.model';
import { Configuration } from './../../models/configuration.model';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mode } from 'src/app/models/mode.model';
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
			this.game.SetCategory(categoryId);
		});

		this.whoIsPlaying();
	}

	public get secoundsOfGame(): number {
		return Math.round((this.settings.modeByTime.time / 1000) * 100) / 100;
	}

	private whoIsPlaying(): void {
		UIkit.modal.prompt('Digite seu nome:', '').then((name: string) => {
			this.game.SetPlayer(name);
			this.notificate(`Vamos jogar ${this.game.player}`);

			this.play();
		});
	}

	public play(): void {
		this.audioFinalGame.nativeElement.pause();
		this.game.ClearHistoric();
		this.vm.LoadWords(this.game.category.data);

		const self = this;
		this.vm.Start().subscribe({
			complete() {
				self.callGameByMode();
			}
		});
	}

	private callGameByMode(): void {
		const self = this;

		switch (this.settings.gameMode) {
			case Mode.ModeByTime:
				this.vm.PlayByTime(this.secoundsOfGame).subscribe({ complete() { self.saveScoreResult(); } });
				break;
			case Mode.ModeNumberOfWords:
				this.vm.PlayByNumberOfWords(this.settings.modeNumberOfWords.numberOfWords);
				break;
			case Mode.ModeTimeByWord:
				this.playTimePerWords();
				break;
			default:
				this.notificate('Este modo de jogo não existe!', 'warning', 10);
				break;
		}
	}

	private playTimePerWords(): void {
		const self = this;

		this.vm.PlayTimeByWord(this.settings.modeTimeByWord.numberOfWords, +this.settings.modeTimeByWord.time).subscribe({
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
		this.game.RightAnswer(this.vm.word);
	}

	private incorrectAnswer(): void {
		this.notificate('Errou!', 'danger', 0.8);
		this.game.IncorrectAnswer(this.vm.word, this.settings.losePointsWhenWrong);
	}

	private computeResult(): void {
		UIkit.modal.prompt('Pontuação:', '').then((score: string | number) => {
			this.game.score = +score || -1;
			this.saveScoreResult();
		});
	}

	private saveScoreResult() {
		if (this.settings.soundEnabled) { this.audioFinalGame.nativeElement.play(); }
		this.vm.isPlayerAddict = this.game.IsPlayerAddict();

		Ranking.AddResult(new Result(this.game.player, this.game.score));

		this.vm.Finished();
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

		if (!this.vm.CanClick || this.settings.gameMode === Mode.ModeTimeByWord) { return; }

		if (!this.vm.HasWords || this.vm.currentProgress <= 0) {
			this.saveScoreResult();
			return;
		}

		if (this.settings.gameMode === Mode.ModeNumberOfWords) {
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

		this.vm.NextWord();
	}

	public configureSound(): void {
		document.querySelectorAll('video, audio').forEach((elem: HTMLAudioElement) => {
			elem.muted = !this.settings.soundEnabled;

			if (!this.settings.soundEnabled) {
				elem.pause();
			}
		});
	}

	public stop(): void {
		this.game = new Game();
		this.vm.Stop();
	}
}
