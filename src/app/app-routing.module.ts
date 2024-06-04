import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DescriptionComponent } from './components/description/description.component';

const routes: Routes = [

  {path: "", component: DashboardComponent, children: [
    {path: "", redirectTo: "description", pathMatch: "full"},
    {path: "description", component: DescriptionComponent},
    {path: "home", component: HomeComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
