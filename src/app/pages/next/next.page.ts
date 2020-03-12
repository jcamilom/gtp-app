import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { GeneralItem } from '../in/in.page';
import { Observable } from 'rxjs';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next',
  templateUrl: './next.page.html',
  styleUrls: ['./next.page.scss'],
})
export class NextPage implements OnInit {

  private itemsCollection: AngularFirestoreCollection<GeneralItem>;
  public items: Observable<GeneralItem[]>;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.itemsCollection = this.firestore.collection<GeneralItem>('items', ref => ref.where('state', '==', 'next'));
    this.items = this.itemsCollection.valueChanges({ idField: 'id' });
  }

  public addItem(): void {
    const state = {
      mode: 'create',
      item: {
        state: 'next',
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
          text: 'In',
          icon: 'albums-outline',
          handler: () => {
            this.itemsCollection.doc<GeneralItem>(item.id).update({ state: 'in' }).then(() => { });
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

  public completeItem(item: GeneralItem): void {
    this.itemsCollection.doc<GeneralItem>(item.id).update({ state: 'completed' }).then(() => { });
  }

}
