import { Ranking } from './../../models/ranking.model';
import { Mode, ModeByTime, ModeTimeByWord, ModeNumberOfWords } from '../../models/mode.model';
import { Configuration } from './../../models/configuration.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SwUpdate } from '@angular/service-worker';
declare var UIkit: any;

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

	public settings: Configuration;
	public serviceWorkerAvailable: boolean;
	private vertionAvailable: boolean;

	public settingsForm = this.fb.group({
		soundEnabled: [true],
		gameMode: [Mode.ModeByTime],
		losePointsWhenWrong: [false],
		numberOfWords: [5],
		timePerWord: [2000],
		playingTime: [30000]
	});

	constructor(public fb: FormBuilder, private readonly swUpdate: SwUpdate) { }

	ngOnInit() {
		this.settings = new Configuration();
		this.serviceWorkerAvailable = this.swUpdate.isEnabled;
		this.checkUpdates();
		this.updateForm();
	}

	private updateForm() {
		this.settingsForm.setValue({
			soundEnabled: this.settings.soundEnabled,
			gameMode: +this.settings.gameMode as Mode,
			losePointsWhenWrong: this.settings.losePointsWhenWrong,
			numberOfWords: +this.settings.gameMode === Mode.ModeNumberOfWords ?
				+this.settings.modeNumberOfWords.numberOfWords :
				+this.settings.modeTimeByWord.numberOfWords,
			timePerWord: +this.settings.modeTimeByWord.time,
			playingTime: +this.settings.modeByTime.time
		});
	}

	public onChangeForm(): void {
		const changes = this.settingsForm.value;

		this.settings.Set(
			changes.soundEnabled,
			+changes.gameMode,
			changes.losePointsWhenWrong,
			new ModeByTime(+changes.playingTime),
			new ModeTimeByWord(+changes.timePerWord, +changes.numberOfWords),
			new ModeNumberOfWords(+changes.numberOfWords)
		);
	}

	public resetSettings(): void {
		this.settings.Reset();
		this.updateForm();
		this.notificate('As configurações foram redefinidas!');
	}

	public resetRanking(): void {
		Ranking.Reset();
		this.notificate('Ranking foi redefinido!');
	}

	private notificate(message: string, timeout = 3000): void {
		UIkit.notification({
			message: `<span uk-icon='icon: check'></span> ${message}`,
			status: 'primary',
			pos: 'bottom-center',
			timeout
		});
	}

	private checkUpdates(): void {
		if (this.swUpdate.isEnabled) {
			this.swUpdate.available.subscribe((response) => {
				console.log(response);
				this.vertionAvailable = true;
			});
		}
	}

	public update(): void {
		if (this.swUpdate.isEnabled && this.vertionAvailable) {
			UIkit.modal.confirm('Nova versão disponível. Atualizar?').then(() => {
				setTimeout(() => {
					this.notificate('Seu app foi atualizado!');
				}, 3000);

				window.location.reload();
			}, () => {
				this.notificate('Atualização cancelada!');
			});
		}
	}
}
