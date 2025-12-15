import { Component } from '@angular/core';
import { SideBar } from "../side-bar/side-bar";
import { RouterOutlet } from "../../../../node_modules/@angular/router/types/_router_module-chunk";

@Component({
  selector: 'app-main',
  imports: [SideBar, RouterOutlet],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
