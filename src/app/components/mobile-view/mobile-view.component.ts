import { Component } from '@angular/core';
import { SectionContent } from '../../models/content.model';
import { ContentService } from '../../services/content.service';
import { MobilePreviewComponent } from "../mobile-preview/mobile-preview.component";
import { WorkExpComponent } from "../work-exp/work-exp.component";


@Component({
  selector: 'app-mobile-view',
  standalone: true,
  imports: [
    MobilePreviewComponent,
    WorkExpComponent
],
  templateUrl: './mobile-view.component.html',
  styleUrl: './mobile-view.component.scss'
})
export class MobileViewComponent {

  sections: SectionContent[];
  devPreviewSection?: SectionContent;
  engPreviewSection?: SectionContent;
  arcPreviewSection?: SectionContent;

  constructor(
    private contentService: ContentService
  ) { 
    this.sections = this.contentService.getSections();
    
    this.devPreviewSection = this.sections.find(sec => sec.section === 'dev-preview');
    this.engPreviewSection = this.sections.find(sec => sec.section === 'eng-preview');
    this.arcPreviewSection = this.sections.find(sec => sec.section === 'arc-preview');
  }
}
