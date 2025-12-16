import { Component } from '@angular/core';
import { SideBar } from "../side-bar/side-bar";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [SideBar,RouterModule],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
