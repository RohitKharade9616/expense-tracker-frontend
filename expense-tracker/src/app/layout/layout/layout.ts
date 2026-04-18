import { Component } from '@angular/core';
import { Main } from "../main/main";
import { RouterModule } from '@angular/router';
import { NavBar } from "../nav-bar/nav-bar";
import { SideBar } from "../side-bar/side-bar";

@Component({
  selector: 'app-layout',
  imports: [ RouterModule, NavBar, SideBar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
