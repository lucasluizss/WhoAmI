import { Configuration } from './app/models/configuration.model';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import database from './data/database.json';

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
			.then(active => !active && navigator.serviceWorker.register('/WhoAmI/ngsw-worker.js'))
			.catch(console.error);
	}
}).catch(console.error);
