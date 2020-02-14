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

  public addItem(item: string, index: number): void {
    console.log('add item buttom clicked');
    this.items.push('new item');
  }

  public moveItem(item: string, index: number): void {
    console.log('add item buttom clicked');
    this.deleteItem(item, index)
  }

  public editItem(item: string, index: number): void {
    console.log('add item buttom clicked');
  }

  public deleteItem(item: string, index: number): void {
    this.items.splice(index, 1);
  }

}
