import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TutorialComponent } from './tutorial.component';

const routes: Routes = [
		{ path: '', component: TutorialComponent, data: {animation: 'SlideAnimation'} }
];

@NgModule({
		declarations: [TutorialComponent],
		imports: [
				CommonModule,
				RouterModule.forChild(routes)
		],
		exports: [RouterModule]
})
export class AppTutorialModule { }
