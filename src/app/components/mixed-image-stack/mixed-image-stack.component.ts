import { CommonModule } from '@angular/common';
import { 
  Component, 
  ElementRef, 
  Input, 
  OnInit, 
  ViewChild, 
  AfterViewInit, 
  ChangeDetectorRef 
} from '@angular/core';

@Component({
    selector: 'app-mixed-image-stack',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './mixed-image-stack.component.html',
    styleUrl: './mixed-image-stack.component.scss'
})
export class MixedImageStackComponent implements OnInit, AfterViewInit {
  @Input() images: string[] = []; 
  @ViewChild('container') containerRef!: ElementRef;

  containerWidth: number = 0;
  containerHeight: number = 0;

  positionedImages: { src: string; x: number; y: number, z: number }[] = [];

  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setContainerDimensions();
    this.positionImages();
    this.cdr.detectChanges();
  }

  private setContainerDimensions(): void {
    const container = this.containerRef.nativeElement;
    this.containerWidth = container.offsetWidth;
    this.containerHeight = container.offsetHeight;
  }

  private positionImages(): void {
    this.positionedImages = this.images.map((src) => ({
      src,
      x: this.getPercentageValue(0, 70), // random position for X
      y: this.getPercentageValue(0, 25), // random position for Y
      z: this.getRandomZIndex() // random z
    }));
  }
  
  private getPercentageValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  
  private getRandomZIndex(): number {
    return Math.floor(Math.random() * 10); // Range: -100 to 100
  }

  private getRandomValue(range: number): number {
    return Math.random() * range;
  }
}
