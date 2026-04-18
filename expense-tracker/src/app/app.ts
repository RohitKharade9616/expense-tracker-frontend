import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Layout } from "./layout/layout/layout";
import { Analytics } from './core/services/analytics';
import { filter } from 'rxjs';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [Layout, SpinnerComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private router:Router,private analytics:Analytics)
  {
    this.router.events
      .pipe(filter((event:any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.analytics.trackPageView(event.urlAfterRedirects);
      });
  }
  protected readonly title = signal('expense-tracker');
}
