import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderBarComponent } from "../header-bar/header-bar.component";
import { CommonModule } from '@angular/common';
import { WorkExpComponent } from "../work-exp/work-exp.component";
import { MixedImageStackComponent } from '../mixed-image-stack/mixed-image-stack.component';
import { ContentService } from '@ng/services/content.service';

@Component({
  selector: 'app-about',
  imports: [
    HeaderBarComponent, 
    CommonModule, 
    WorkExpComponent,
    MixedImageStackComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  dadImages: string[] = [];
  quirkyImages: string[] = [];

  @ViewChild('editor') editorRef!: ElementRef<HTMLDivElement>;
  @ViewChild('content') contentRef!: ElementRef<HTMLDivElement>;

  numbers: number[] = []; // Array of line numbers
  
  constructor(
    private contentService: ContentService,
    private cdr: ChangeDetectorRef
  ) {
    this.dadImages = contentService.returnDadImages();
    this.quirkyImages = contentService.returnQuirkImages();
  }

  ngAfterViewInit(): void {
    this.adjustLineNumbers();
    window.addEventListener('resize', this.adjustLineNumbers.bind(this)); // Adjust on window resize
  }

  adjustLineNumbers(): void {
    const contentElement = this.contentRef.nativeElement;

    // Find all child elements in the content area
    const childElements = Array.from(contentElement.children) as HTMLElement[];

    // Determine the lowest element by its bottom position
    const lowestElement = childElements.reduce((lowest, el) => {
      const elBottom = el.getBoundingClientRect().bottom;
      return elBottom > lowest ? elBottom : lowest;
    }, 0);

    // Calculate height needed for numbers
    const editorTop = this.editorRef.nativeElement.getBoundingClientRect().top;
    const totalHeight = lowestElement - editorTop; // Height based on the lowest element
    const lineHeight = 15 + 2; // Height of each <span> (15px) + gap (2px)
    const numLines = Math.ceil(totalHeight / lineHeight); // Calculate how many lines fit

    this.numbers = Array.from({ length: numLines }, (_, i) => i + 1); // Generate numbers
    this.cdr.detectChanges(); // Trigger change detection
  }
}
  
