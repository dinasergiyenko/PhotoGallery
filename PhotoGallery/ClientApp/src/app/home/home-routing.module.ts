import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../home/home-page/home-page.component';
import { ErrorPageComponent } from '../home/error-page/error-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'error', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
