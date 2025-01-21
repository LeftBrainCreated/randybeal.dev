import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-mixed-image-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mixed-image-stack.component.html',
  styleUrl: './mixed-image-stack.component.scss'
})
export class MixedImageStackComponent implements OnInit, AfterViewInit {
  @Input() images: string[] = []; 
  @ViewChild('container') containerRef!: ElementRef;

  containerWidth: number = 0;
  containerHeight: number = 0;

  positionedImages: { src: string; x: number; y: number, z: number }[] = [];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setContainerDimensions();
    this.positionImages();
  }

  private setContainerDimensions(): void {
    const container = this.containerRef.nativeElement;
    this.containerWidth = container.offsetWidth;
    this.containerHeight = container.offsetHeight;
  }

  private positionImages(): void {
    this.positionedImages = this.images.map((src) => ({
      src,
      x: this.getPercentageValue(0, 75), // Random percentage for X
      y: this.getPercentageValue(0, 60), // Random percentage for Y
      z: this.getRandomZIndex() // Randomized Z-index
    }));
  }
  
  private getPercentageValue(min: number, max: number): number {
    // Returns a random percentage between min and max
    return Math.random() * (max - min) + min;
  }
  
  private getRandomZIndex(): number {
    // Randomized Z-index between -100 and 100
    return Math.floor(Math.random() * 201 - 100); // Range: -100 to 100
  }

  private getRandomValue(range: number): number {
    return Math.random() * range;
  }
}
