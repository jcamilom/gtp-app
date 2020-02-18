import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public addItem(item: string, index: number): void {
    this.router.navigate(['/item-detail'], { state: { item, mode: 'create' } });
  }

  public moveItem(item: string, index: number): void {
  }

  public editItem(item: string, index: number): void {
    this.router.navigate(['/item-detail'], { state: { item, mode: 'edit' } });
  }

  public deleteItem(item: string, index: number): void {
    this.items.splice(index, 1);
  }

}
