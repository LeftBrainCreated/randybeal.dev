import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-contact-card',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './contact-card.component.html',
    styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {

  @Input() activated: boolean = false;

  protected cardActive: boolean = false;
  isLogoActivated = false;
  tooltipVisible = true;

  onMouseOver() {
    this.tooltipVisible = false;
  }

  onMouseLeave() {
    this.tooltipVisible = true;
  }

  protected stopClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  protected activateContactCard(event: MouseEvent): void {
    this.cardActive = true
    event.stopPropagation();
  }

  protected deactivateContactCard(): void {
    this.cardActive = false;
  }

}
