import { Component, Input } from '@angular/core';
import { ButtonContent, SectionContent } from '../../models/content.model';
import { CommonModule } from '@angular/common';
import { ImageStackComponent } from '../image-stack/image-stack.component';

@Component({
    selector: 'app-preview-section',
    imports: [CommonModule, ImageStackComponent],
    standalone: true,
    templateUrl: './preview-section.component.html',
    styleUrl: './preview-section.component.scss'
})
export class PreviewSectionComponent {

  @Input() section?: SectionContent;
  activeButton?: ButtonContent;

  constructor() {}

  ngOnInit(): void {
    if (this.section?.buttons.length) {
      this.setActiveButton(this.section.buttons[0]);
    }
  }

  setActiveButton(button: ButtonContent): void {
    this.activeButton = button;
  }  
}
