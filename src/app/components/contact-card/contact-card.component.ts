import { Component } from '@angular/core';

@Component({
    selector: 'app-contact-card',
    imports: [],
    standalone: true,
    templateUrl: './contact-card.component.html',
    styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {

  protected cardActive: boolean = false;
  isLogoActivated = false;

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
