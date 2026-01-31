import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AddTutorialComponent} from "./components/add-tutorial/add-tutorial.component";
import {TutorialsListComponent} from "./components/tutorials-list/tutorials-list.component";
import {TutorialDetailsComponent} from "./components/tutorial-details/tutorial-details.component";
import {OrganismCreateComponent} from "./organism-create/organism-create.component";
import {OrganismListComponent} from "./components/organism-list/organism-list.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-tutorial', component: AddTutorialComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'create-organism', component: OrganismCreateComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'organisms', component: OrganismListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
