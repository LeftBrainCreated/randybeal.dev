import { Component, Input } from '@angular/core';
import { ButtonContent, SectionContent } from '../../models/content.model';
import { CommonModule } from '@angular/common';
import { ImageStackComponent } from '../image-stack/image-stack.component';

@Component({
  selector: 'app-preview-section',
  standalone: true,
  imports: [CommonModule, ImageStackComponent],
  templateUrl: './preview-section.component.html',
  styleUrl: './preview-section.component.scss'
})
export class PreviewSectionComponent {

  @Input() section?: SectionContent;
  activeButton?: ButtonContent;

  constructor() {}

  ngOnInit(): void {
    // Load the section matching "dev-preview"
    
    // this.section = sections.find(sec => sec.section === 'dev-preview');

    // Set the first button as the default active
    if (this.section?.buttons.length) {
      this.setActiveButton(this.section.buttons[0]);
    }
  }

  setActiveButton(button: ButtonContent): void {
    this.activeButton = button;
  }  
}
