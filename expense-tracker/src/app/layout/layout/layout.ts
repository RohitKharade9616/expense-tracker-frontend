import { Component } from '@angular/core';
import { NavBar } from "../nav-bar/nav-bar";
import { Main } from "../main/main";

@Component({
  selector: 'app-layout',
  imports: [NavBar, Main],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
