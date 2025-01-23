import { Component, Input, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ButtonContent, SectionContent } from '../../models/content.model';
import { CommonModule } from '@angular/common';
import { MobileImageStackComponent } from "../mobile-image-stack/mobile-image-stack.component";

@Component({
    selector: 'app-mobile-preview',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        CommonModule,
        FormsModule,
        MobileImageStackComponent
    ],
    standalone: true,
    templateUrl: './mobile-preview.component.html',
    styleUrl: './mobile-preview.component.scss'
})
export class MobilePreviewComponent {

  @Input() section!: SectionContent | undefined;

  selectedButton: string = this.section ? this.section.buttons[0]?.name : '';
  selectedButtonContent: ButtonContent | undefined = this.section ? this.section.buttons[0] : undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['section'] && this.section) {
      this.selectedButton = this.section.buttons[0]?.name || '';
      this.selectedButtonContent = this.section.buttons[0];
    }
  }
  
  updateContent(): void {
    this.selectedButtonContent = this.section!.buttons.find(
      (button) => button.name === this.selectedButton
    );
  }

}
