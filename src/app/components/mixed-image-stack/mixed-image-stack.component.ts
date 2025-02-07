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
  @Input() screenSize: number = 0;
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
    let maxX = this.screenSize == 0 ? 70 : 50;
    let maxY = this.screenSize == 0 ? 25 : 30;

    this.positionedImages = this.images.map((src) => ({
      src,
      x: this.getPercentageValue(0, maxX),
      y: this.getPercentageValue(0, maxY),
      z: this.getRandomZIndex()
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
