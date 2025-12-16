import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from "@angular/material/icon";
export interface SidebarItem {
  label: string;
  icon?: string;          // lucide / heroicon name
  route?: string;
  children?: SidebarItem[];
  permission?: string;
}
 const SIDEBAR_MENU: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: 'layout-dashboard',
    route: '/dashboard'
  },
  {
    label: 'Expenses',
    icon: 'wallet',
    children: [
      {
        label: 'All Expenses',
        route: '/expenses'
      },
      {
        label: 'Add Expense',
        route: '/expenses/new'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'bar-chart-3',
    route: '/reports'
  },
  {
    label: 'Settings',
    icon: 'settings',
    children: [
      {
        label: 'Profile',
        route: '/settings/profile'
      },
      {
        label: 'Categories',
        route: '/settings/categories'
      }
    ]
  }
];
@Component({
  selector: 'app-side-bar',
  imports: [RouterModule, MatIconModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})

export class SideBar {

 menu = SIDEBAR_MENU;
  openIndex = signal<number | null>(null);

  toggle(index: number) {
    this.openIndex.update(v => (v === index ? null : index));
  }
}
