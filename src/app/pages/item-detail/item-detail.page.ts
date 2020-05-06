import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralItem } from '../in/in.page';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { PopoverController } from '@ionic/angular';
import { ColorPickerComponent } from '../../components/color-picker/color-picker.component';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {

  public form: FormGroup;

  private item: GeneralItem;
  private mode: string;
  public stateOptions = ['in', 'next'];
  public color: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private firestore: AngularFirestore,
    private popoverController: PopoverController,
  ) { }

  ngOnInit() {
    const formValue: GeneralItem = { id: '', title: '', description: '', state: '', color: '' };
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.item = navigation.extras.state.item;
      this.mode = navigation.extras.state.mode;
      if (this.mode === 'edit') {
        formValue.title = this.item.title;
        formValue.description = this.item.description;
        formValue.color = this.item.color;
        this.color = this.item.color;
      }
      formValue.state = this.item.state;
    }
    this.form = this.fb.group({
      title: [formValue.title, [Validators.required]],
      description: formValue.description,
      state: [formValue.state, [Validators.required]],
      color: formValue.color,
    });
  }

  public submitForm(): void {
    const formValue = this.form.value;
    if (this.mode === 'create') {
      this.firestore.collection('items').add(formValue).then(() => {
        this.navigateBack();
      });
    } else {
      const valuesToUpdate: any = {};
      for (const key of Object.keys(this.item)) {
        if (key !== 'id' && formValue[key] !== this.item[key]) {
          valuesToUpdate[key] = formValue[key];
        }
      }
      if (Object.keys(valuesToUpdate).length !== 0) {
        this.firestore.collection('items').doc<GeneralItem>(this.item.id).update(valuesToUpdate).then(() => {
          this.navigateBack();
        });
      } else {
        this.navigateBack();
      }
    }
  }

  public navigateBack(): void {
    this.location.back();
  }

  async pickColor(ev: any) {
    const popover = await this.popoverController.create({
      component: ColorPickerComponent,
      event: ev,
      componentProps: { selected: this.color }
    });
    popover.style.cssText = '--min-width: 160px; --max-width: 160px;';
    popover.onWillDismiss().then(result => {
      if (result.role === 'selected') {
        this.form.patchValue({ color: result.data.value });
        this.color = result.data.value;
      }
    });
    return await popover.present();
  }

}
