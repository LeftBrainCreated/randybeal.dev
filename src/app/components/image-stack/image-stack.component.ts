import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, AfterViewInit, Renderer2, SimpleChanges, PLATFORM_ID, Inject, OnChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-image-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-stack.component.html',
  styleUrl: './image-stack.component.scss'
})
export class ImageStackComponent implements OnChanges {
  @Input() 
  images?: string[];

  activeIndex: number | null = null;
  spacing = 100;  
  spreadAmount = 150; // How much surrounding images shift away

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnChanges(): void {
    this.observeVideos();
  }
  
  get maxOffset(): number {
    return (this.images!.length - 1) * this.spacing;
  }
  
  getOffset(index: number): string {
    if (this.activeIndex !== null) {
      const distance = Math.abs(this.activeIndex - index);
      if (distance === 1) {
        return `${index * this.spacing + (index < this.activeIndex ? -this.spreadAmount : this.spreadAmount)}px`;
      } else if (distance > 1) {
        return `${index * this.spacing + (index < this.activeIndex ? -this.spreadAmount / 2 : this.spreadAmount / 2)}px`;
      }
    }
    return `${index * this.spacing}px`; // Default positioning
  }

  getYOffset(index: number): string {
    return `${index * -25}px`;
  }

  getZIndex(index: number): number {
    return this.activeIndex === index ? 100 : index + 1;
  }

  bringToFront(index: number): void {
    this.activeIndex = index;
  }

  resetZIndex(): void {
    this.activeIndex = null; // Reset on mouse leave
  }

  isVideo(media: string): boolean {
    return media.endsWith('.mp4') || media.endsWith('.webm') || media.endsWith('.ogg') || media.startsWith('https://youtu');
  }

  observeVideos(): void {
    if (typeof IntersectionObserver !== 'undefined') { // Ensure IntersectionObserver is available
      const videos: NodeListOf<HTMLVideoElement> = this.el.nativeElement.querySelectorAll('video');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.2 } // 20% visibility triggers play/pause
      );

      videos.forEach((video) => observer.observe(video));
    }
  }
}
