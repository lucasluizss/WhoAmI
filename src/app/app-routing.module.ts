import { LayoutComponent } from './layouts/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "home",
        loadChildren: () => import('./views/home/home.module').then((x) => x.AppHomeModule)
      },
      {
        path: "ranking",
        loadChildren: () => import('./views/ranking/ranking.module').then((x) => x.AppRankingModule)
      },
      {
        path: "play",
        loadChildren: () => import('./views/game/game.module').then((x) => x.AppGameModule)
      },
      {
        path: "settings",
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
