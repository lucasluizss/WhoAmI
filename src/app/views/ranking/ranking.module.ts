import { RankingComponent } from './ranking.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: RankingComponent }
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
