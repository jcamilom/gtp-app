import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { FormControl } from '@angular/forms';

export interface GeneralItem {
  id: string;
  title: string;
  state: string;
  description?: string;
  color?: string;
}

@Component({
  selector: 'app-in',
  templateUrl: './in.page.html',
  styleUrls: ['./in.page.scss'],
})
export class InPage implements OnInit {

  private itemsCollection: AngularFirestoreCollection<GeneralItem>;
  private items$: Observable<GeneralItem[]>;
  public filteredItems$: Observable<GeneralItem[]>;
  public filterControl = new FormControl('');
  private filterValue$: Observable<string>;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.itemsCollection = this.firestore.collection<GeneralItem>('items', ref => ref.where('state', '==', 'in'));
    this.items$ = this.itemsCollection.valueChanges({ idField: 'id' });
    this.filterValue$ = this.filterControl.valueChanges.pipe(startWith(''));
    this.filteredItems$ = combineLatest([this.items$, this.filterValue$])
      .pipe(
        map(([items, filterString]) => this._filter(items, filterString))
      );
  }

  private _filter(items: GeneralItem[], filterValue: string): GeneralItem[] {
    filterValue = filterValue.toLowerCase();
    return items.filter(item => item.title.toLowerCase().indexOf(filterValue) !== -1);
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
