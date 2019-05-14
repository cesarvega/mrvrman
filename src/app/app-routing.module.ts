import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePgComponent } from './home-pg/home-pg.component';
import { FeaturesComponent } from './features/features.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FightComponent } from './fight/fight.component';

const routes: Routes = [
  {
    path: '',
    component: HomePgComponent,
    pathMatch: 'full'
  },
  {
    path: 'features',
    component: FeaturesComponent
  },
  {
    path: 'fight',
    component: FightComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
