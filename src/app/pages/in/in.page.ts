import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in',
  templateUrl: './in.page.html',
  styleUrls: ['./in.page.scss'],
})
export class InPage implements OnInit {

  public items: string[] = [
    'Pokémon Yellow',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World'
  ];

  constructor() { }

  ngOnInit() {
  }

}
