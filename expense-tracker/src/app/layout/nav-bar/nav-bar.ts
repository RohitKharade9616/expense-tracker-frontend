import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIconModule,MatFormFieldModule,MatSelectModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
dropDown = Array.from({ length: 6 }, (_, i) => {
  const startYear = 2024 + i;
  const endYear = (startYear + 1).toString().slice(-2);

  return {
    name: `FY ${startYear}-${endYear}`,
    value: `${startYear}-${endYear}`
  };
});

}
