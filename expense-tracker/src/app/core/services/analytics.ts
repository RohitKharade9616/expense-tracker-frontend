import { Injectable } from '@angular/core';
declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class Analytics {
    trackPageView(url: string) {
    gtag('config', 'G-3CNXDP5C1X', {
      page_path: url
    });
  }
}
