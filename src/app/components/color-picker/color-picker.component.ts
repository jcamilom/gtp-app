import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

export interface Color {
  name: string;
  value: string;
}

const DEFAULT_COLORS: Color[][] = [
  [
    { name: 'turquoise', value: '#1abc9c' },
    { name: 'emerald', value: '#2ecc71' },
    { name: 'peter river', value: '#3498db' },
    { name: 'amethyst', value: '#9b59b6' },
    { name: 'wet asphalt', value: '#34495e' }
  ],
  [
    { name: 'sun flower', value: '#f1c40f' },
    { name: 'carrot', value: '#e67e22' },
    { name: 'alizarin', value: '#e74c3c' },
    { name: 'clouds', value: '#ecf0f1' },
    { name: 'concrete', value: '#95a5a6' }
  ]
];

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {

  public colors: Color[][] = DEFAULT_COLORS;

  public selected: string; // TODO: use Type or Enum

  constructor(
    private popoverController: PopoverController,
    private navParams: NavParams,
  ) { }

  ngOnInit() {
    if (this.navParams.data.selected) {
      this.selected = this.navParams.data.selected;
    }
  }

  public select(color: Color): void {
    this.popoverController.dismiss(color, 'selected');
  }

}
