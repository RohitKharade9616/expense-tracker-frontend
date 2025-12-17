import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CustomMaterialModule } from '../../shared/material modules/custom.material.module';

@Component({
  selector: 'app-nav-bar',
  imports: [CustomMaterialModule],
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
