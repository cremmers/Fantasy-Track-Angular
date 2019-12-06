import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild, Input } from '@angular/core';

import { forkJoin } from 'rxjs';

import { switchMap, switchAll, flatMap } from 'rxjs/operators';

import { Router } from '@angular/router';

import { Player } from '../shared/player';

import { Team } from '../shared/team';

// import { PLAYERS } from '../player_list';

import { TeamService } from "../services/team.service";

import { PlayerService } from "../services/player.service";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})

export class PlayersComponent implements AfterViewInit {

  players: Player[];
  player: Player;
  
  teams: Team[] = [];
  team: Team;

  player_array: any[] = [];
  team_name: string;

  search: string;

  @ViewChild('playerList')
  private el: ElementRef;

  constructor(private renderer: Renderer2, private teamService: TeamService, private playerService: PlayerService, private router: Router) { }

  ngOnInit() { this.getPlayers();
               this.teamService.currentTeam
                 .subscribe(team => this.team = team);
               this.teamService.getTeams()
                 .subscribe(teams => this.teams = teams);
  }

  ngAfterViewInit() {
  }

  getPlayers() {
    this.playerService.getPlayers()
      .subscribe(players => this.players = players);
  }

  compareFn(t1: Team, t2: Team): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

  searchFn(event: any) {
    // variables for saving search string and list items
    let filter = this.search.toUpperCase();
    let ul = document.getElementById('player_list');
    let li = ul.getElementsByTagName('li');

    // loop through all list items, and hide those who don't match the search query
    for (let i=0; i < li.length; i++) {
      let name = li[i].getElementsByTagName('p')[0];
      let position = li[i].getElementsByTagName('p')[1];
      let team = li[i].getElementsByTagName('p')[2];
      if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      }
      else if (position.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      }
      else if (team.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      }   
      else {
          li[i].style.display = "none";
      }
    }
  }

  clickPlayer(event: any) {
    event.stopPropagation();
    event.preventDefault();
  	let player_html = event.currentTarget.innerHTML;
    // console.log(player_html);
    let player_name = event.currentTarget.children[1].innerHTML.trim();
    console.log(player_name);

  	if (player_html.indexOf('- QB') != -1 && !document.getElementById('p-1').innerHTML.includes('- QB')) {
    
     let player_li = this.el.nativeElement.children[0];
     
     // copy player into roster list
     document.getElementById('p-1').innerHTML = player_html;

     // create delete button and attach to player
     let delete_player = this.renderer.createElement('button');
	   let x = this.renderer.createText('x');
	   this.renderer.appendChild(delete_player, x);
	   this.renderer.setAttribute(delete_player, 'id', 'p1-del');
	   this.renderer.addClass(delete_player, 'delete_player');
	   this.renderer.appendChild(player_li, delete_player);

     // remove player elements and delete button, add text
	   this.renderer.listen(delete_player, 'click', (event) => {
      let childElements = Array.from(player_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player_li, child);
      } 
      let p = this.renderer.createElement('p');
      let QB = this.renderer.createText('QB');
      this.renderer.appendChild(p, QB)
      this.renderer.appendChild(player_li, p);
     });      
    }

    else if (player_html.indexOf('- RB') != -1 && document.getElementById('p-2').innerHTML.includes('RB1') && document.getElementById('p-3').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-6').innerHTML.indexOf(player_name) == -1) {
      
     let player_li = this.el.nativeElement.children[1];
     
     // copy player into roster list
     document.getElementById('p-2').innerHTML = player_html;

     // create delete button and attach to player
     let delete_player = this.renderer.createElement('button');
     let x = this.renderer.createText('x');
     this.renderer.appendChild(delete_player, x);
     this.renderer.setAttribute(delete_player, 'id', 'p2-del');
     this.renderer.addClass(delete_player, 'delete_player');
     this.renderer.appendChild(player_li, delete_player);

     // remove player elements and delete button, add text
     this.renderer.listen(delete_player, 'click', (event) => {
      let childElements = Array.from(player_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player_li, child);
      }
      let p = this.renderer.createElement('p');
      let RB1 = this.renderer.createText('RB1');
      this.renderer.appendChild(p, RB1);
      this.renderer.appendChild(player_li, p);     
     });      
    }

    else if (player_html.indexOf('- RB') != -1 && document.getElementById('p-3').innerHTML.includes('RB2') && document.getElementById('p-2').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-6').innerHTML.indexOf(player_name) == -1) {

     let player_li = this.el.nativeElement.children[2];
     
     // copy player into roster list
     document.getElementById('p-3').innerHTML = player_html;

     // create delete button and attach to player
     let delete_player = this.renderer.createElement('button');
     let x = this.renderer.createText('x');
     this.renderer.appendChild(delete_player, x);
     this.renderer.setAttribute(delete_player, 'id', 'p3-del');
     this.renderer.addClass(delete_player, 'delete_player');
     this.renderer.appendChild(player_li, delete_player);

     // remove player elements and delete button, add text
     this.renderer.listen(delete_player, 'click', (event) => {
      let childElements = Array.from(player_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player_li, child);
      }
      let p = this.renderer.createElement('p');
      let RB2 = this.renderer.createText('RB2');
      this.renderer.appendChild(p, RB2);
      this.renderer.appendChild(player_li, p);       
     });      
    }


    else if (player_html.indexOf('- WR') != -1 && document.getElementById('p-4').innerHTML.includes('WR1') && document.getElementById('p-5').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-6').innerHTML.indexOf(player_name) == -1) {

    let player_li = this.el.nativeElement.children[3];
     
     // copy player into slot in table
     document.getElementById('p-4').innerHTML = player_html;

     // create delete button and attach to player
     let delete_player = this.renderer.createElement('button');
     let x = this.renderer.createText('x');
     this.renderer.appendChild(delete_player, x);
     this.renderer.setAttribute(delete_player, 'id', 'p4-del');
     this.renderer.addClass(delete_player, 'delete_player');
     this.renderer.appendChild(player_li, delete_player);

     // remove player elements and delete button, add text
     this.renderer.listen(delete_player, 'click', (event) => {
      let childElements = Array.from(player_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player_li, child);
      }
      let p = this.renderer.createElement('p');
      let WR1 = this.renderer.createText('WR1');
      this.renderer.appendChild(p, WR1);
      this.renderer.appendChild(player_li, p);
     });      
    }

    else if (player_html.indexOf('- WR') != -1 && document.getElementById('p-5').innerHTML.includes('WR2') && document.getElementById('p-4').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-6').innerHTML.indexOf(player_name) == -1) {

     let player_li = this.el.nativeElement.children[4];
     
     // copy player into roster list
     document.getElementById('p-5').innerHTML = player_html;

     // create delete button and attach to player
     let delete_player = this.renderer.createElement('button');
     let x = this.renderer.createText('x');
     this.renderer.appendChild(delete_player, x);
     this.renderer.setAttribute(delete_player, 'id', 'p5-del');
     this.renderer.addClass(delete_player, 'delete_player');
     this.renderer.appendChild(player_li, delete_player);

     // remove player elements and delete button, add text
     this.renderer.listen(delete_player, 'click', (event) => {
      let childElements = Array.from(player_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player_li, child);
      }
      let p = this.renderer.createElement('p');
      let WR2 = this.renderer.createText('WR2');
      this.renderer.appendChild(p, WR2);
      this.renderer.appendChild(player_li, p);
     });      
    }

    else if (player_html.indexOf('- TE') != -1 && !document.getElementById('p-7').innerHTML.includes('- TE') && document.getElementById('p-6').innerHTML.indexOf(player_name) == -1) {

     let player_li = this.el.nativeElement.children[6];
     
     // copy player into roster list
     document.getElementById('p-7').innerHTML = player_html;

     // create delete button and attach to player
     let delete_player = this.renderer.createElement('button');
     let x = this.renderer.createText('x');
     this.renderer.appendChild(delete_player, x);
     this.renderer.setAttribute(delete_player, 'id', 'p7-del');
     this.renderer.addClass(delete_player, 'delete_player');
     this.renderer.appendChild(player_li, delete_player);

     // remove player elements and delete button, add text
     this.renderer.listen(delete_player, 'click', (event) => {
      let childElements = Array.from(player_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player_li, child);
      }
      let p = this.renderer.createElement('p');
      let TE = this.renderer.createText('TE');
      this.renderer.appendChild(p, TE);
      this.renderer.appendChild(player_li, p);
     });      
    }

     else if ((player_html.indexOf('- RB') != -1 || player_html.indexOf('- WR') != -1 || player_html.indexOf('- TE') != -1) && !document.getElementById('p-6').innerHTML.includes('- RB') && !document.getElementById('p-6').innerHTML.includes('- WR') && !document.getElementById('p-6').innerHTML.includes('- TE') && document.getElementById('p-2').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-3').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-4').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-5').innerHTML.indexOf(player_name) == -1 && document.getElementById('p-7').innerHTML.indexOf(player_name) == -1) {

     let player_li = this.el.nativeElement.children[5];
     
     // copy player into roster list
     document.getElementById('p-6').innerHTML = player_html;

     // create delete button and attach to player
     let delete_player = this.renderer.createElement('button');
     let x = this.renderer.createText('x');
     this.renderer.appendChild(delete_player, x);
     this.renderer.setAttribute(delete_player, 'id', 'p6-del');
     this.renderer.addClass(delete_player, 'delete_player');
     this.renderer.appendChild(player_li, delete_player);

     // remove player elements and delete button, add text
     this.renderer.listen(delete_player, 'click', (event) => {
      let childElements = Array.from(player_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player_li, child);
      }
      let p = this.renderer.createElement('p');
      let WRT = this.renderer.createText('RB/WR/TE');
      this.renderer.appendChild(p, WRT);
      this.renderer.appendChild(player_li, p);
     });      
    }

  }

  saveTeam(event: any) {
    // get all list items in team list    
    let player_nodes = document.getElementById('roster_list').querySelectorAll('img');

    if (player_nodes.length >= 7) {

      // set team variables
      let team_id = this.teams.length == 0 ? 1 : Math.max(...this.teams.map(team => team.id)) + 1;
      let team_name = this.team_name;
      console.log(this.team_name);
      let team_date = new Date(); 

      // get selected players
      let player_elements = document.getElementById('roster_list').getElementsByTagName('li');

      // push player ids from HTML collection into array
      let playerid_array = [];
      for (let i=0; i < player_elements.length; i++) {
        playerid_array.push(player_elements[i].children[1].id);
      };
     
      // call getPlayer method from player service and push retrieved player observables into observables array
      let observables = [];
      for (let i=0; i < playerid_array.length; i++) {               
        observables.push(this.playerService.getPlayer(playerid_array[i]));       
      }

      // subscribe to player observables, create team object
      forkJoin(observables)
        .subscribe(player_array => {
          this.player_array = player_array;
          this.team = {id: team_id, name: team_name, created: team_date, players: this.player_array};
          console.log(this.team);

          // call addTeam method from team service and push team object into team array, call getTeams method from team service     
          this.teamService.addTeam(this.team)
            .subscribe(team => {
              this.teams.push(team);
            });     
          this.teamService.getTeams()
            .subscribe(teams => this.teams = teams);
          console.log(this.teams);
          alert("Team Saved!");
      });            
    }

    else {
      alert("Please choose a complete team.");
      this.router.navigate(['/']);
    }
  }

  sendTeam(event: any) {
    this.teamService.sendTeam(this.team);   
  }

  loadTeam(event: any) {
    // empty roster list    
    document.getElementById('roster_list').innerHTML = '';
    console.log(this.teams);  

    // create table slots and delete buttons and place players
    for (let i=0; i < this.team.players.length; i++) {
      let load_player = this.renderer.createElement('li');
      this.renderer.setAttribute(load_player, 'class','list-group-item');
      this.renderer.setAttribute(load_player, 'id','p-' + [i+1]);
      
      let id = this.team.players[i].id.toString();      
      let name = this.team.players[i].name;
      let position = this.team.players[i].position;
      let player_team = this.team.players[i].team;    
      let logo = this.team.players[i].logo;
      let alt = this.team.players[i].alt;        
      
      let logo_element = this.renderer.createElement("img");
      this.renderer.setAttribute(logo_element, 'src',logo);
      this.renderer.setAttribute(logo_element, 'class','logo');
      this.renderer.setAttribute(logo_element, 'alt',alt);
      this.renderer.appendChild(load_player, logo_element);

      let name_element = this.renderer.createElement('p');
      let position_element = this.renderer.createElement('p');
      let team_element = this.renderer.createElement('p');
      this.renderer.setAttribute(name_element, 'id', id);
      this.renderer.setAttribute(name_element, 'class','selected_player');
      name_element.innerHTML = ' ' + name + ' ';
      position_element.innerHTML = '-' + ' ' + position + ' ' + '-';
      team_element.innerHTML = ' ' + player_team + ' ';

      this.renderer.appendChild(load_player, name_element);
      this.renderer.appendChild(load_player, position_element);
      this.renderer.appendChild(load_player, team_element);

      let delete_player = this.renderer.createElement('button');
      let x = this.renderer.createText('x');
      this.renderer.appendChild(delete_player, x);
      this.renderer.appendChild(load_player, delete_player);
      this.renderer.setAttribute(delete_player, 'id','p' + [i+1] + '-del');
      this.renderer.setAttribute(delete_player, 'class','delete_player');
      let roster_list = document.getElementById('roster_list')
      this.renderer.appendChild(roster_list, load_player);
    }

    // create empty slot in table when delete button is clicked
    let p1_del = document.getElementById('p1-del');
    let player_li = this.el.nativeElement.children[0];
    this.renderer.listen(p1_del, 'click', (event) => {
      let childElements = Array.from(player_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player_li, child);
      } 
      let p = this.renderer.createElement('p');
      let QB = this.renderer.createText('QB');
      this.renderer.appendChild(p, QB)
      this.renderer.appendChild(player_li, p);
    });

    let p2_del = document.getElementById('p2-del');
    let player2_li = this.el.nativeElement.children[1];
    this.renderer.listen(p2_del, 'click', (event) => {
      let childElements = Array.from(player2_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player2_li, child);
      } 
      let p = this.renderer.createElement('p');
      let RB1 = this.renderer.createText('RB1');
      this.renderer.appendChild(p, RB1)
      this.renderer.appendChild(player2_li, p);
    });

    let p3_del = document.getElementById('p3-del');
    let player3_li = this.el.nativeElement.children[2];
    this.renderer.listen(p3_del, 'click', (event) => {
      let childElements = Array.from(player3_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player3_li, child);
      } 
      let p = this.renderer.createElement('p');
      let RB2 = this.renderer.createText('RB2');
      this.renderer.appendChild(p, RB2)
      this.renderer.appendChild(player3_li, p);
    });                     
        
    let p4_del = document.getElementById('p4-del');
    let player4_li = this.el.nativeElement.children[3];
    this.renderer.listen(p4_del, 'click', (event) => {
      let childElements = Array.from(player4_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player4_li, child);
      } 
      let p = this.renderer.createElement('p');
      let WR1 = this.renderer.createText('WR1');
      this.renderer.appendChild(p, WR1)
      this.renderer.appendChild(player4_li, p);
    });

    let p5_del = document.getElementById('p5-del');
    let player5_li = this.el.nativeElement.children[4];
    this.renderer.listen(p5_del, 'click', (event) => {
      let childElements = Array.from(player5_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player5_li, child);
      } 
      let p = this.renderer.createElement('p');
      let WR2 = this.renderer.createText('WR2');
      this.renderer.appendChild(p, WR2)
      this.renderer.appendChild(player5_li, p);
    });

    let p7_del = document.getElementById('p7-del');
    let player7_li = this.el.nativeElement.children[6];
    this.renderer.listen(p7_del, 'click', (event) => {
      let childElements = Array.from(player7_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player7_li, child);
      } 
      let p = this.renderer.createElement('p');
      let TE = this.renderer.createText('TE');
      this.renderer.appendChild(p, TE)
      this.renderer.appendChild(player7_li, p);
    });

    let p6_del = document.getElementById('p6-del');
    let player6_li = this.el.nativeElement.children[5];
    this.renderer.listen(p6_del, 'click', (event) => {
      let childElements = Array.from(player6_li.children);
      for (let child of childElements) {
       this.renderer.removeChild(player6_li, child);
      } 
      let p = this.renderer.createElement('p');
      let WRT = this.renderer.createText('RB/WR/TE');
      this.renderer.appendChild(p, WRT)
      this.renderer.appendChild(player6_li, p);
    });
  }

  deleteTeam(event: any) {
    // this.teams = this.teams.filter(t => t !== this.team);
    this.teamService.deleteTeam(this.team)
      .subscribe();        
    this.teamService.getTeams()
      .subscribe(teams => {
        this.teams = teams;
        this.teams.length == 0 ? this.team = null : this.team = this.teams[this.teams.length - 1];
      });
    console.log(this.teams);
    alert("Team Deleted!");
  }

  resetTeam(event: any) {
    // remove player elements and delete button for all positions, add text
    let qb_li = this.el.nativeElement.children[0];
    let qb_childElements = Array.from(qb_li.children);
    for (let child of qb_childElements) {
     this.renderer.removeChild(qb_li, child);
    } 
    let qb_p = this.renderer.createElement('p');
    let QB = this.renderer.createText('QB');
    this.renderer.appendChild(qb_p, QB)
    this.renderer.appendChild(qb_li, qb_p);

    let rb1_li = this.el.nativeElement.children[1];
    let rb1_childElements = Array.from(rb1_li.children);
    for (let child of rb1_childElements) {
     this.renderer.removeChild(rb1_li, child);
    }
    let rb1_p = this.renderer.createElement('p');
    let RB1 = this.renderer.createText('RB1');
    this.renderer.appendChild(rb1_p, RB1);
    this.renderer.appendChild(rb1_li, rb1_p);

    let rb2_li = this.el.nativeElement.children[2];
    let rb2_childElements = Array.from(rb2_li.children);
    for (let child of rb2_childElements) {
     this.renderer.removeChild(rb2_li, child);
    }
    let rb2_p = this.renderer.createElement('p');
    let RB2 = this.renderer.createText('RB2');
    this.renderer.appendChild(rb2_p, RB2);
    this.renderer.appendChild(rb2_li, rb2_p);

    let wr1_li = this.el.nativeElement.children[3];
    let wr1_childElements = Array.from(wr1_li.children);
    for (let child of wr1_childElements) {
     this.renderer.removeChild(wr1_li, child);
    }
    let wr1_p = this.renderer.createElement('p');
    let WR1 = this.renderer.createText('WR1');
    this.renderer.appendChild(wr1_p, WR1);
    this.renderer.appendChild(wr1_li, wr1_p);

    let wr2_li = this.el.nativeElement.children[4];
    let wr2_childElements = Array.from(wr2_li.children);
    for (let child of wr2_childElements) {
     this.renderer.removeChild(wr2_li, child);
    }
    let wr2_p = this.renderer.createElement('p');
    let WR2 = this.renderer.createText('WR2');
    this.renderer.appendChild(wr2_p, WR2);
    this.renderer.appendChild(wr2_li, wr2_p);

    let te_li = this.el.nativeElement.children[6];
    let te_childElements = Array.from(te_li.children);
    for (let child of te_childElements) {
     this.renderer.removeChild(te_li, child);
    }
    let te_p = this.renderer.createElement('p');
    let TE = this.renderer.createText('TE');
    this.renderer.appendChild(te_p, TE);
    this.renderer.appendChild(te_li, te_p);

    let wrt_li = this.el.nativeElement.children[5];
    let wrt_childElements = Array.from(wrt_li.children);
    for (let child of wrt_childElements) {
     this.renderer.removeChild(wrt_li, child);
    }
    let wrt_p = this.renderer.createElement('p');
    let WRT = this.renderer.createText('RB/WR/TE');
    this.renderer.appendChild(wrt_p, WRT);
    this.renderer.appendChild(wrt_li, wrt_p);        
  } 
}
