import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RankingComponent } from './ranking.component';

const routes: Routes = [
		{ path: '', component: RankingComponent, data: {animation: ''} }
];

@NgModule({
		declarations: [RankingComponent],
		imports: [
				CommonModule,
				RouterModule.forChild(routes)
		],
		exports: [RouterModule]
})
export class AppRankingModule { }
