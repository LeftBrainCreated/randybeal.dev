import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Subscription } from 'rxjs';
import { DefaultViewComponent } from "./components/default-view/default-view.component";
import { MobileViewComponent } from "./components/mobile-view/mobile-view.component";

enum ScreenSizeEnum {
  Large,
  Medium,
  Small
}

// const window:any = {};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DefaultViewComponent, MobileViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private screenSizeSubscription: Subscription | undefined;
  private isBrowser: boolean;

  title = 'portfolio';
  opacityValue = 1;

  screenSize: ScreenSizeEnum = ScreenSizeEnum.Large;
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    this.checkScreen();
  }
  
  ngOnInit(): void {
    if (this.isBrowser) {
      // Simulate a scroll to trigger rendering adjustments
      setTimeout(() => {
        window.scrollBy(0, 1);
        setTimeout(() => {
          window.scrollBy(0, -1);
        }, 50);
      }, 100);

      window.addEventListener('scroll', this.setScrollVar.bind(this));
      window.addEventListener('resize', this.setScrollVar.bind(this));
      this.setScrollVar(); 
  }
  
    this.checkScreen();
  }

  checkScreen(): void {
    this.screenSizeSubscription = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small, 
        Breakpoints.Medium, 
        Breakpoints.Large, 
        Breakpoints.XLarge
      ])
      .pipe(
        map(state => {
          if (state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small]) {
            return ScreenSizeEnum.Small;
          } else if (state.breakpoints[Breakpoints.Medium]) {
            return ScreenSizeEnum.Medium;
          } else if (state.breakpoints[Breakpoints.Large] || state.breakpoints[Breakpoints.XLarge]) {
            return ScreenSizeEnum.Large;
          }
          return ScreenSizeEnum.Large; // Default case
        })
      )
      .subscribe(screenSize => {
        this.screenSize = screenSize;
      });
  }

  setScrollVar(): void {
      const htmlElement = document.documentElement;
      const scrollHeight = htmlElement.scrollHeight - htmlElement.clientHeight; // Total scrollable height
      const percentScrolled = (window.scrollY / scrollHeight) * 100;
      console.log(percentScrolled);
      htmlElement.style.setProperty('--scroll', `${percentScrolled}`);
  }

  ngOnDestroy(): void {
    if (this.screenSizeSubscription) {
      this.screenSizeSubscription.unsubscribe();
    }
  }
}
