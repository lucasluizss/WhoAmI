import { SettingsComponent } from './settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: SettingsComponent }
];

@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AppSettingsModule { }
