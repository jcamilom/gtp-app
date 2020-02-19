import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';

export interface GeneralItem {
  id: string;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-in',
  templateUrl: './in.page.html',
  styleUrls: ['./in.page.scss'],
})
export class InPage implements OnInit {

  private itemsCollection: AngularFirestoreCollection<GeneralItem>;
  public items: Observable<GeneralItem[]>;

  constructor(private router: Router, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.itemsCollection = this.firestore.collection<GeneralItem>('items');
    this.items = this.itemsCollection.valueChanges({ idField: 'id' });
  }

  public addItem(item: GeneralItem): void {
    this.router.navigate(['/item-detail'], { state: { item, mode: 'create' } });
  }

  public moveItem(item: GeneralItem): void {
  }

  public editItem(item: GeneralItem): void {
    this.router.navigate(['/item-detail'], { state: { item, mode: 'edit' } });
  }

  public deleteItem(item: GeneralItem): void {
    this.itemsCollection.doc<GeneralItem>(item.id).delete();
  }

}
