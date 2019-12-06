import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Player } from '../shared/player';

import { PlayerService } from "../services/player.service";

import { StatsService } from "../services/stats.service";

@Component({
  selector: 'app-playerdetail',
  templateUrl: './playerdetail.component.html',
  styleUrls: ['./playerdetail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  player: Player;

  players: Player[];

  stats: any;

  numbers: any;

  QB: boolean = false;
  RB: boolean = false;
  WR: boolean = false;
  TE: boolean = false;
  
  constructor(private route: ActivatedRoute, private playerService: PlayerService, private statsService: StatsService) { }

  ngOnInit() { 
     this.getPlayer();
  }

  getPlayer(): void {
   const id = +this.route.snapshot.paramMap.get('id');
   console.log(id);
   this.playerService.getPlayer(id)
    .subscribe(player => {
      this.player = player
    this.statsService.searchPlayer(this.player.name)
     .subscribe(stats => 
       this.stats = stats);
    this.statsService.getStats(this.player.name)
     .subscribe(numbers => 
       this.numbers = numbers);
    this.getPosition();
    this.playerService.getPlayersByPosition(this.player.position)
     .subscribe(players => this.players = players);  
   });
  }

  getSmallPlayer(id): void {
    this.playerService.getPlayer(id)
     .subscribe(player => {
      this.player = player
      this.statsService.searchPlayer(this.player.name)
       .subscribe(stats => 
         this.stats = stats);
      this.statsService.getStats(this.player.name)
       .subscribe(numbers => 
         this.numbers = numbers);
      this.getPosition();
    });
  }

  getPosition() {
    if (this.player.position == "QB") {
      this.QB = true;
    }
    else if (this.player.position == "RB") {
      this.RB = true;
    }
    else if (this.player.position == "WR") {
      this.WR = true;
    }
    else if (this.player.position == "TE") {
      this.TE = true;
    }
  }

}