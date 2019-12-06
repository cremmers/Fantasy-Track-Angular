import { Component, OnInit } from '@angular/core';

import { Team } from '../shared/team';

import { TeamService } from "../services/team.service";

import { StatsService } from "../services/stats.service";

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  team: Team;

  constructor(private teamService: TeamService, private route: ActivatedRoute, private statsService: StatsService ) { }

  ngOnInit() { this.teamService.currentTeam
  				.subscribe(team => this.team = team);
  }
  
}
