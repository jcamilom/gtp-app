import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { ActionSheetController, AlertController } from '@ionic/angular';

export interface GeneralItem {
  id: string;
  title: string;
  state: string;
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

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.itemsCollection = this.firestore.collection<GeneralItem>('items', ref => ref.where('state', '==', 'in'));
    this.items = this.itemsCollection.valueChanges({ idField: 'id' });
  }

  public addItem(): void {
    const state = {
      mode: 'create',
      item: {
        state: 'in',
      },
    };
    this.router.navigate(['/item-detail'], { state });
  }

  public editItem(item: GeneralItem): void {
    this.router.navigate(['/item-detail'], { state: { item, mode: 'edit' } });
  }

  public async deleteItem(item: GeneralItem) {
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete <strong>${item.title}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            this.itemsCollection.doc<GeneralItem>(item.id).delete();
          }
        }
      ]
    });
    await alert.present();
  }

  public async moveItem(item: GeneralItem): Promise<any> {
    const actionSheet = await this.actionSheetController.create({
      header: 'Where to?',
      buttons: [
        {
          text: 'Next',
          icon: 'rocket-outline',
          handler: () => {
            this.itemsCollection.doc<GeneralItem>(item.id).update({ state: 'next' }).then(() => { });
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        }
      ]
    });
    await actionSheet.present();
  }

}
