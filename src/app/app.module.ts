import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { AppLayoutsModule } from './layouts/layouts.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppLayoutsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
