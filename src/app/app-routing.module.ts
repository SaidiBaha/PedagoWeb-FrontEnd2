import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { ListUserComponent } from './components/User/list-user/list-user.component';
import { ListThematiqueComponent } from './components/Competance/Thematique/list-thematique/list-thematique.component';
import { AuthComponent } from './components/Auth/auth/auth.component';
import { QuestionsComponent } from './components/questions/questions.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponentComponent },
  { path: 'listUser', component: ListUserComponent },
  { path: 'listTh', component: ListThematiqueComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'ads',component:AdvertisementComponent},
  { path: 'sc', component:QuestionsComponent },
  { path: '**', component: NotFoundComponent }
  
];
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
