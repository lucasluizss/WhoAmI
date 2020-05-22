import { TutorialComponent } from './tutorial.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
		{ path: '', component: TutorialComponent, data: {animation: 'TutorialPage'} }
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
