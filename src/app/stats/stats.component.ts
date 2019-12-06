import { Component, OnInit, Input } from '@angular/core';

import { Observable, of } from 'rxjs';

import { StatsService } from "../services/stats.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats: any;

  numbers: any;

  QB: boolean = false;
  RB: boolean = false;
  WR: boolean = false;
  TE: boolean = false;

  @Input() sendPlayer;	

  constructor( private statsService: StatsService ) { }

  ngOnInit() { this.statsService.searchPlayer(this.sendPlayer.name)
                .subscribe(stats => this.stats = stats);
               this.statsService.getStats(this.sendPlayer.name)
                .subscribe(numbers => this.numbers = numbers);
               this.getPosition();
  }

  getPosition() {
    if (this.sendPlayer.position == "QB") {
      this.QB = true;
    }
    else if (this.sendPlayer.position == "RB") {
      this.RB = true;
    }
    else if (this.sendPlayer.position == "WR") {
      this.WR = true;
    }
    else if (this.sendPlayer.position == "TE") {
      this.TE = true;
    }
  }
}
