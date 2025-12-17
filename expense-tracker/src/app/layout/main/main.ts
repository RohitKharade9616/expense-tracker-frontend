import { Component } from '@angular/core';
import { SideBar } from "../side-bar/side-bar";
import { Router, RouterModule } from '@angular/router';
import { NavBar } from "../nav-bar/nav-bar";

@Component({
  selector: 'app-main',
  imports: [SideBar, RouterModule, NavBar],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
