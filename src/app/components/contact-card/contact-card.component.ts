import { Component } from '@angular/core';

@Component({
    selector: 'app-contact-card',
    imports: [],
    standalone: true,
    templateUrl: './contact-card.component.html',
    styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {

  protected stopClick(event: MouseEvent): void {
    event.stopPropagation();
  }

}
