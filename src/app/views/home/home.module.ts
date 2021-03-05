import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HomeComponent } from './home.component';
import { environment } from '@environments/environment.prod';

const routes: Routes = [
		{ path: '', component: HomeComponent, data: {animation: 'HomePage'} }
];

@NgModule({
		declarations: [HomeComponent],
		imports: [
				CommonModule,
				RouterModule.forChild(routes),
				ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
		],
		exports: [RouterModule]
})
export class AppHomeModule { }
