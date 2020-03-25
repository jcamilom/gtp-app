import { Component, OnInit } from '@angular/core';

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

const DEFAULT_SELECTED_COLOR: Color = { name: 'peter river', value: '#3498db' };

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {

  public colors: Color[][] = DEFAULT_COLORS;

  public selected: Color = DEFAULT_SELECTED_COLOR;

  constructor() { }

  ngOnInit() { }

}
