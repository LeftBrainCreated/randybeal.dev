import { Component, Input, OnInit } from '@angular/core';
import { MonitorComponent } from "../monitor/monitor.component";
import { ProjectsComponent } from "../projects/projects.component";
import { AiRoleCheckComponent } from "../ai-role-check/ai-role-check.component";
import { ContentService } from '@ng/services/content.service';
import { CommonModule } from '@angular/common';
import { DisplayService } from '@ng/services/display.service';

enum ScreenSizeEnum {
  Large,
  Medium,
  Small
}

@Component({
  selector: 'app-welcome',
  imports: [
    MonitorComponent, 
    AiRoleCheckComponent,
    CommonModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})

export class WelcomeComponent implements OnInit {
  protected aiVisible: boolean = false;
  protected typeCodeVisible: boolean = false;

  protected screenSize!: ScreenSizeEnum;

  constructor(
    private content: ContentService,
    protected display: DisplayService
  ) { }

  ngOnInit(): void {
      this.content.typerSub.subscribe((res) => {
        this.typeCodeVisible = res;
      });

      this.content.aiRoleUtility.subscribe((ai) => {
        this.aiVisible = ai;
      });

      this.screenSize = this.display.getDisplay();
  }

  protected disableAiRoleCheck() {
    this.aiVisible = false;
  }

  protected closeTyper(): void {
    this.content.typerSub.next(false);
    this.typeCodeVisible = false;
  }

  protected closeContact(): void {
    this.content.contactCardObs.next(false);
  }
}
