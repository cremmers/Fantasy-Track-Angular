import { Routes } from '@angular/router';

import { PlayersComponent } from '../players/players.component';
import { TeamsComponent } from '../teams/teams.component';
import { PlayerDetailComponent } from '../playerdetail/playerdetail.component';

export const routes: Routes = [
  { path: 'home', component: PlayersComponent },
  { path: 'team', component: TeamsComponent },
  { path: 'playerdetail/:id', component: PlayerDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];