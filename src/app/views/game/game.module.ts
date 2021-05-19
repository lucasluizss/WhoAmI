import { GameComponent } from './game.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
		{ path: '', component: GameComponent, data: {animation: 'SlideAnimation'} }
];

@NgModule({
		declarations: [GameComponent],
		imports: [
				CommonModule,
				RouterModule.forChild(routes)
		],
		exports: [RouterModule]
})
export class AppGameModule { }
