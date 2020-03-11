import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { GeneralItem } from '../in/in.page';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-next',
  templateUrl: './next.page.html',
  styleUrls: ['./next.page.scss'],
})
export class NextPage implements OnInit {

  private itemsCollection: AngularFirestoreCollection<GeneralItem>;
  public items: Observable<GeneralItem[]>;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.itemsCollection = this.firestore.collection<GeneralItem>('items', ref => ref.where('state', '==', 'next'));
    this.items = this.itemsCollection.valueChanges({ idField: 'id' });
  }

}
