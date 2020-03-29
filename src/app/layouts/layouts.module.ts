import { LayoutComponent } from './layout/layout.component';
import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        LayoutComponent,
        NavComponent
    ],
    imports: [RouterModule]
})
export class AppLayoutsModule { }
