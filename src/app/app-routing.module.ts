import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layouts/layout/layout.component';


const routes: Routes = [
	{
		path: 'game',
		component: AppComponent,
		children: [
			{
				path: 'play',
				loadChildren: () => import('./views/game/game.module').then((x) => x.AppGameModule)
			},
		]
	},
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./views/tutorial/tutorial.module').then((x) => x.AppTutorialModule)
			},
			{
				path: 'home',
				loadChildren: () => import('./views/home/home.module').then((x) => x.AppHomeModule)
			},
			{
				path: 'ranking',
				loadChildren: () => import('./views/ranking/ranking.module').then((x) => x.AppRankingModule)
			},
			{
				path: 'settings',
				loadChildren: () => import('./views/settings/settings.module').then((x) => x.AppSettingsModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
