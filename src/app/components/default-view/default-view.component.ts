import { Component, Inject, PLATFORM_ID, OnInit, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service'
import { PreviewSectionComponent } from "../preview-section/preview-section.component";
import { SectionContent } from '../../models/content.model';
import { MixedImageStackComponent } from '../mixed-image-stack/mixed-image-stack.component';
import { WorkExpComponent } from '../work-exp/work-exp.component';
import { ContactCardComponent } from '../contact-card/contact-card.component';

enum ScreenSizeEnum {
  Large,
  Medium,
  Small
}


@Component({
    selector: 'app-default-view',
    imports: [
        PreviewSectionComponent,
        MixedImageStackComponent,
        WorkExpComponent,
        ContactCardComponent
    ],
    standalone: true,
    templateUrl: './default-view.component.html',
    styleUrl: './default-view.component.scss'
})
export class DefaultViewComponent {
  private isBrowser: boolean;

  sections: SectionContent[];
  devPreviewSection?: SectionContent;
  engPreviewSection?: SectionContent;
  arcPreviewSection?: SectionContent;

  dadImages: string[] = [];
  quirkyImages: string[] = [];

  opacityValue = 1;

  protected cardActive: boolean = false;
  isLogoActivated = false;

  @Input()
  screenSize!: ScreenSizeEnum;
  

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private contentService: ContentService,
    private el: ElementRef, 
    private renderer: Renderer2
  ) {
    // this.isBrowser = isPlatformBrowser(this.platformId);
    this.sections = this.contentService.getSections();
    
    this.devPreviewSection = this.sections.find(sec => sec.section === 'dev-preview');
    this.engPreviewSection = this.sections.find(sec => sec.section === 'eng-preview');
    this.arcPreviewSection = this.sections.find(sec => sec.section === 'arc-preview');

    this.dadImages = contentService.returnDadImages();
    this.quirkyImages = contentService.returnQuirkImages();
  }
  
  @HostListener('window:scroll', [])
  onScroll(): void {
    const paragraphs = this.el.nativeElement.querySelectorAll('.left p:not(#intro)');
    const startFade = window.innerHeight * 0.2;
    const endFade = window.innerHeight * 0.1;

    const scroll = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scroll'));
    this.isLogoActivated = scroll > 94;

    paragraphs.forEach((paragraph: HTMLElement) => {
      const rect = paragraph.getBoundingClientRect();
      let opacity = 1;

      if (rect.top <= startFade) {
        const fadeProgress = (rect.top - endFade) / (startFade - endFade);
        opacity = Math.max(0, Math.min(1, fadeProgress));
      }

      this.renderer.setStyle(paragraph, 'opacity', opacity.toString());
    });
  }

  ngOnInit(): void {
    this.contentService.closeContactCard.subscribe(() => {
      this.deactivateContactCard();
    })
  
    if (this.isBrowser) {
      window.addEventListener('scroll', this.setScrollVar.bind(this));
      window.addEventListener('resize', this.setScrollVar.bind(this));
      this.setScrollVar(); 
    }
  }

  setScrollVar(): void {
      const htmlElement = document.documentElement;
      const scrollHeight = htmlElement.scrollHeight - htmlElement.clientHeight; // Total scrollable height
      const percentScrolled = (window.scrollY / scrollHeight) * 100;
      // console.log(percentScrolled); // for debug
      htmlElement.style.setProperty('--scroll', `${percentScrolled}`);
  }

  protected activateContactCard(event: MouseEvent): void {
    this.cardActive = true
    event.stopPropagation();
  }

  protected deactivateContactCard(): void {
    this.cardActive = false;
  }
}
