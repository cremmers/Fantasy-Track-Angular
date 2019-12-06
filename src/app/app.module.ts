import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { HeaderComponent } from './header/header.component';
import { TeamsComponent } from './teams/teams.component';

import { RoutingModule } from './routing/routing.module';
import { PlayerDetailComponent } from './playerdetail/playerdetail.component';

import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { StatsComponent } from './stats/stats.component';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    HeaderComponent,
    TeamsComponent,
    PlayerDetailComponent,
    StatsComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false, passThruUnknownUrl: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
