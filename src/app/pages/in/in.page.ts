import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';

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

  public items: Observable<GeneralItem[]>;

  constructor(private router: Router, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.items = this.firestore.collection<GeneralItem>('items').valueChanges();
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
    // this.items.splice(index, 1);
  }

}
