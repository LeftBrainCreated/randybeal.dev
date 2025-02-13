import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

interface MediaItem {
  type: 'image' | 'video'; 
  src: string;
}

@Component({
    selector: 'app-mobile-image-stack',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './mobile-image-stack.component.html',
    styleUrl: './mobile-image-stack.component.scss'
})

export class MobileImageStackComponent implements OnInit, OnDestroy, OnChanges {
  @Input() mediaList: string[] = [];
  @Input() autoplayInterval: number = 5000;

  parsedMediaList: MediaItem[] = [];
  currentIndex: number = 0;
  translateX: number = 0;
  swipeX: number = 0;

  private listStartPos = 0;
  private startX: number = 0;
  private isDragging: boolean = false;
  private autoplayTimer: any;

  ngOnInit(): void {
    this.setMediaList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setMediaList();
    // this.startAutoplay();
  }

  getMiddleValueAndParity(num: number): { middle: number; isEven: boolean } {
    const middle = Math.ceil(num / 2);
    const isEven = num % 2 === 0; 
    return { middle, isEven };
  }

  private setMediaList() {
    this.parsedMediaList = this.mediaList.map((src) => ({
      src,
      type: this.getMediaType(src),
    }));
    
    // let t = this.getMiddleValueAndParity(this.parsedMediaList.length);
    // this.listStartPos = this.translateX = (t.middle + (t.isEven ? .5 : 0))
    this.translateX = 0;
    this.currentIndex = 0;
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  onSwipeStart(event: MouseEvent | TouchEvent): void {
    this.stopAutoplay();
    this.startX = this.getEventX(event);
    this.isDragging = true;
  }

  onSwipeMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;

    const currentX = this.getEventX(event);
    const deltaX = currentX - this.startX;
    this.swipeX = (deltaX / window.innerWidth) * 100;
  }

  onSwipeEnd(): void {
    this.isDragging = false;

    const threshold = 20;

    if (this.swipeX > threshold) {
      this.currentIndex--; // Swipe right
    } else if (this.swipeX < -threshold) {
      this.currentIndex++; // Swipe left
    }

    this.handleInfiniteScroll();
    this.translateX = this.currentIndex;
    this.stopAutoplay();
  }

  private getEventX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }

  private handleInfiniteScroll(): void {
    if (this.currentIndex < 0) {
      this.currentIndex = this.parsedMediaList.length - 1;
    } else if (this.currentIndex >= this.parsedMediaList.length) {
      this.currentIndex = 0;
    }
  }

  private getMediaType(src: string): 'image' | 'video' {
    const ext = src.split('.').pop()?.toLowerCase();
    return ext === 'mp4' || ext === 'webm' || ext === 'ogg' ? 'video' : 'image';
  }

  goToSlide(index: number): void {
    this.stopAutoplay();
    this.currentIndex = index;
    this.translateX = index;
  }

  private startAutoplay(): void {
    if (this.autoplayInterval > 0) {
      this.autoplayTimer = setInterval(() => {
        this.currentIndex = this.currentIndex + 1;
        this.handleInfiniteScroll();

        this.translateX = this.listStartPos - this.currentIndex;
      }, this.autoplayInterval);
    }
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
}