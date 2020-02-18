import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralItem } from '../in/in.page';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {

  public form: FormGroup;

  private item: GeneralItem;
  private mode: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) { }

  ngOnInit() {
    const formValue = { title: '', description: '' };
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.item = navigation.extras.state.item;
      this.mode = navigation.extras.state.mode;
      if (this.mode === 'edit') {
        formValue.title = this.item.title;
        formValue.description = this.item.description;
      }
    }
    this.form = this.fb.group({
      title: [formValue.title, [Validators.required]],
      description: formValue.description
    });
  }

  public submitForm(): void {

  }

  public navigateBack(): void {
    this.location.back();
  }

}
