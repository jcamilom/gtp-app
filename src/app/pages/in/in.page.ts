import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface GeneralItem {
  title: string;
  description?: string;
}

@Component({
  selector: 'app-in',
  templateUrl: './in.page.html',
  styleUrls: ['./in.page.scss'],
})
export class InPage implements OnInit {

  public items: GeneralItem[] = [
    {
      title: 'Homework',
      description: 'Do homework'
    },
    {
      title: 'Workout',
      description: 'Go to the gym'
    },
    {
      title: 'Laundry',
    },
    {
      title: 'Vacations',
      description: 'Plan vacations'
    },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public addItem(item: GeneralItem, index: number): void {
    this.router.navigate(['/item-detail'], { state: { item, mode: 'create' } });
  }

  public moveItem(item: GeneralItem, index: number): void {
  }

  public editItem(item: GeneralItem, index: number): void {
    this.router.navigate(['/item-detail'], { state: { item, mode: 'edit' } });
  }

  public deleteItem(item: GeneralItem, index: number): void {
    this.items.splice(index, 1);
  }

}
