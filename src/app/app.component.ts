import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';


import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Subscription } from 'rxjs';
// import { DefaultViewComponent } from "./components/default-view/default-view.component";
// import { MobileViewComponent } from "./components/mobile-view/mobile-view.component";
// import { ContentService } from './services/content.service';
// import { WelcomeComponent } from "./components/welcome/welcome.component";
import { RouterOutlet } from '@angular/router';
import { ContactCardComponent } from "./components/contact-card/contact-card.component";
import { HttpClientModule } from '@angular/common/http';

enum ScreenSizeEnum {
  Large,
  Medium,
  Small
}

@Component({
    selector: 'app-root',
    imports: [
    CommonModule,
    RouterOutlet,
    ContactCardComponent,
    HttpClientModule
],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private screenSizeSubscription: Subscription | undefined;
  // private isBrowser: boolean;

  title = 'portfolio';
  opacityValue = 1;

  protected cardActive: boolean = false;
  isLogoActivated = false;

  screenSize: ScreenSizeEnum = ScreenSizeEnum.Large;
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private breakpointObserver: BreakpointObserver,
  ) {

    // page fade in

    // if (typeof document !== 'undefined') {
    //   window.addEventListener('DOMContentLoaded', () => {
    //     const overlay = document.getElementById('page-overlay');

    //     // white screen on load
    //     if (overlay) {
    //       setTimeout(() => {
    //         overlay.style.opacity = '0';
      
    //         overlay.addEventListener('transitionend', () => {
    //           if (overlay.parentElement) {
    //             overlay.parentElement.removeChild(overlay);
    //           }
    //         });
    //       }, 500);
    //     }
    //   });
    // }
    
    // this.isBrowser = isPlatformBrowser(this.platformId);
    
    // this.checkScreen();
  }
  
  ngOnInit(): void {
  //   // screen jiggle to order components by scroll position
  //   if (this.isBrowser) {
  //     setTimeout(() => {
  //       window.scrollBy(0, 2);
  //       setTimeout(() => {
  //         window.scrollBy(0, -2);
  //       }, 100);
  //     }, 500);

  //     window.addEventListener('scroll', this.setScrollVar.bind(this));
  //     window.addEventListener('resize', this.setScrollVar.bind(this));
  //     this.setScrollVar(); 
  // }
  
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
          if (state.breakpoints[Breakpoints.XSmall]) {
            return ScreenSizeEnum.Small;
          } else if (state.breakpoints[Breakpoints.Small] || state.breakpoints[Breakpoints.Medium]) {
            return ScreenSizeEnum.Medium;
          } else if (state.breakpoints[Breakpoints.Large] || state.breakpoints[Breakpoints.XLarge]) {
            return ScreenSizeEnum.Large;
          }
          return ScreenSizeEnum.Large;
        })
      )
      .subscribe(screenSize => {
        this.screenSize = screenSize;
      });
  }

  protected activateContactCard(event: MouseEvent): void {
    this.cardActive = true
    event.stopPropagation();
  }

  protected deactivateContactCard(): void {
    this.cardActive = false;
  }

  ngOnDestroy(): void {
    if (this.screenSizeSubscription) {
      this.screenSizeSubscription.unsubscribe();
    }
  }
}
