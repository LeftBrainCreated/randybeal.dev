import { Component, HostListener } from '@angular/core';
import { SectionContent } from '../../models/content.model';
import { ContentService } from '../../services/content.service';
import { MobilePreviewComponent } from "../mobile-preview/mobile-preview.component";
import { WorkExpComponent } from "../work-exp/work-exp.component";
import { ContactCardComponent } from "../contact-card/contact-card.component";
import { MixedImageStackComponent } from "../mixed-image-stack/mixed-image-stack.component";


@Component({
  selector: 'app-mobile-view',
  standalone: true,
  imports: [
    MobilePreviewComponent,
    WorkExpComponent,
    ContactCardComponent,
    MixedImageStackComponent
],
  templateUrl: './mobile-view.component.html',
  styleUrl: './mobile-view.component.scss'
})
export class MobileViewComponent {

  sections: SectionContent[];
  devPreviewSection?: SectionContent;
  engPreviewSection?: SectionContent;
  arcPreviewSection?: SectionContent;

  dadImages: string[] = [];
  quirkyImages: string[] = [];

  protected cardActive: boolean = false;

  isLogoActivated = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.isLogoActivated = scrollY > 5900;
  }

  constructor(
    private contentService: ContentService
  ) { 
    this.sections = this.contentService.getSections();
    
    this.devPreviewSection = this.sections.find(sec => sec.section === 'dev-preview');
    this.engPreviewSection = this.sections.find(sec => sec.section === 'eng-preview');
    this.arcPreviewSection = this.sections.find(sec => sec.section === 'arc-preview');

    this.dadImages = contentService.returnDadImages();
    this.quirkyImages = contentService.returnQuirkImages();
  }

  protected activateContactCard(event: MouseEvent): void {
    this.cardActive = true
    event.stopPropagation();
  }

  protected deactivateContactCard(): void {
    this.cardActive = false;
  }
}
