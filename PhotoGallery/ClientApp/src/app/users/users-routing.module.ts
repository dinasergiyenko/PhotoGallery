import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewUserPageComponent } from './view-user-page/view-user-page.component';

const routes: Routes = [
    { path: 'user/:id', component: ViewUserPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }
