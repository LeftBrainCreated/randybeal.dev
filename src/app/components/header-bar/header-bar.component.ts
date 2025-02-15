import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ContentService } from '@ng/services/content.service';

@Component({
  selector: 'app-header-bar',
  imports: [
    CommonModule
  ],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss'
})
export class HeaderBarComponent {
  @Input() screenSize: number = 0;

  constructor(
    private content: ContentService
  ) { }

  activateContactCard(event: MouseEvent): void {
    this.content.contactCardObs.next(true);
    event.stopPropagation();
  }

}
