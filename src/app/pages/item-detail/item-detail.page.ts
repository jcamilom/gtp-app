import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {

  public form: FormGroup;

  item: string;
  mode: string;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    const formValue = { title: '', description: '' };
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      this.item = navigation.extras.state.item;
      this.mode = navigation.extras.state.mode;
      if (this.mode === 'edit') {
        formValue.title = 'title';
        formValue.description = 'anything';
      }
    }
    this.form = this.fb.group({
      title: [formValue.title, [Validators.required]],
      description: formValue.description
    });
  }

  public submitForm(): void {

  }

}
