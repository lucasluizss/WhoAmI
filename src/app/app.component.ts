import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { slideInAnimation } from './animations';

declare var UIkit: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
	public title = 'WhoAmI';

	constructor(private readonly swUpdate: SwUpdate) {}

	async ngOnInit(): Promise<void> {
		await this.rotate();
		await this.fullScreenCheck();

		this.addToHomeScreen();
		this.loadNewVersion();
	}

	private addToHomeScreen(): void {
		const isIos = () => {
			const userAgent = window.navigator.userAgent.toLowerCase();
			return /iphone|ipad|ipod/.test(userAgent);
		};

		const isInStandaloneMode = () => 'standalone' in window.navigator;

		if (isIos() && !isInStandaloneMode()) {
			UIkit.modal
				.alert('<span uk-icon="phone"></span> Adicionar na tela inicial!')
				.then(() => {
					UIkit.notification({
						message: 'Adicionado à tela inicial!',
						status: 'primary',
						pos: 'bottom-center',
						timeout: 2000,
					});
				});
		}
	}

	private loadNewVersion(): void {
		if (this.swUpdate.isEnabled) {
			this.swUpdate.available.subscribe(() => {
				UIkit.modal.confirm('Nova versão disponível. Atualizar?').then(
					() => window.location.reload(),
					() =>
						UIkit.notification({
							message: 'Cancelled',
							status: 'primary',
							pos: 'bottom-center',
						})
				);
			});
		}
	}

	private async rotate(): Promise<void> {
		try {
			await screen.orientation.lock('landscape');
		} catch (err) {
			throw new Error(err);
		}
	}

	private fullScreenCheck(): Promise<void> {
		if (document.fullscreenElement) {
			return;
		}

		return document.documentElement.requestFullscreen();
	}
}
