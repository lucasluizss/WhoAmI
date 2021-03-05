import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import database from '@data/database.json';
import { AppModule } from './app/app.module';
import { environment } from '@environments/environment';
import { Configuration } from '@models/configuration.model';

if (environment.production) {
	enableProdMode();
}

let settings = JSON.parse(localStorage.getItem('settings')) as Configuration;

if (!settings) {
	settings = database.configuration as Configuration;
	localStorage.setItem('settings', JSON.stringify(settings));
}

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
	if (environment.production && 'serviceWorker' in navigator) {
		navigator.serviceWorker.getRegistration()
			.then(active => !active && navigator.serviceWorker.register('/WhoAmI/ngsw-worker.js'));
	}
});
