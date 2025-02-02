import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ContentService } from '@ng/services/content.service';

@Component({
  selector: 'app-monitor',
  imports: [CommonModule],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss'
})
export class MonitorComponent implements OnInit, AfterViewChecked {

  hackerTyper: boolean = false;
  codeText: string = '';
  codeLength = 0;

  @ViewChild('contentDiv') contentDiv!: ElementRef; // ✅ Properly reference the div

  // contentDiv!: HTMLElement; // Store reference to div


  constructor(
    private content: ContentService,
    private renderer: Renderer2
  ) {
   }

   ngOnInit(): void {
       this.content.typerSub.subscribe((res) => {
        if (!res) {
          this.disableHackerTyper();
        }
       })
   }

   ngAfterViewChecked() {
    if (this.hackerTyper) {
      this.scrollToBottom();
    }
  }

  protected enableRoleCheck(): void {
    this.content.aiRoleUtility.next(true);
  }

  async enableHackerTyper(): Promise<void> {
    this.codeLength = 0;
    (await this.content.getHackyTypeCode()).subscribe((res) => {
      this.codeText = res;
      this.codeText = this.codeText.replace('\\n', '<br />');
      this.hackerTyper = true;

      this.content.typerSub.next(true);
    });
  }

  disableHackerTyper(): void {
    this.hackerTyper = false;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (this.hackerTyper) {
      this.typeHack();
    }
  }

  typeHack(): void {
    this.codeLength = this.codeLength + Math.floor(Math.random() * 3 + 1);
  }

  scrollToBottom() {
    if (this.contentDiv && this.contentDiv.nativeElement) {
      const element = this.contentDiv.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
}
