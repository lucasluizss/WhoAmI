import { FormBuilder } from '@angular/forms';
import { SwUpdate } from '@angular/service-worker';
import { Component, OnInit } from '@angular/core';

import { Ranking } from '@models/ranking.model';
import { Configuration } from '@models/configuration.model';
import {
	Mode,
	ModeByTime,
	ModeTimeByWord,
	ModeNumberOfWords,
} from '@models/mode.model';

declare var UIkit: any;

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
	public settings: Configuration;
	public serviceWorkerAvailable: boolean;
	private vertionAvailable: boolean;

	public settingsForm = this.fb.group({
		soundEnabled: [true],
		gameMode: [Mode.ByTime],
		losePointsWhenWrong: [false],
		numberOfWords: [5],
		timePerWord: [2000],
		playingTime: [30000],
	});

	constructor(public fb: FormBuilder, private readonly swUpdate: SwUpdate) {}

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
			numberOfWords:
				+this.settings.gameMode === Mode.NumberOfWords
					? +this.settings.modeNumberOfWords.numberOfWords
					: +this.settings.modeTimeByWord.numberOfWords,
			timePerWord: +this.settings.modeTimeByWord.time,
			playingTime: +this.settings.modeByTime.time,
		});
	}

	public onChangeForm(): void {
		const changes = this.settingsForm.value;

		this.settings.set(
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
		Ranking.reset();
		this.notificate('Ranking foi redefinido!');
	}

	private notificate(message: string, timeout = 3000): void {
		UIkit.notification({
			message: `<span uk-icon='icon: check'></span> ${message}`,
			status: 'primary',
			pos: 'bottom-center',
			timeout,
		});
	}

	private checkUpdates(): void {
		if (this.swUpdate.isEnabled) {
			this.swUpdate.available.subscribe(response => {
				this.vertionAvailable = true;
			});
		}
	}

	public update(): void {
		if (this.vertionAvailable) {
			UIkit.modal.confirm('Nova versão disponível. Atualizar?').then(
				() => {
					this.notificate('Seu app está sendo atualizado!');

					setTimeout(() => {
						window.location.reload();
					}, 3000);
				},
				() => {
					this.notificate('Atualização cancelada!');
				}
			);
		} else {
			this.notificate('Você está atualizado!');
		}
	}
}
