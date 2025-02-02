import { Component, OnInit } from '@angular/core';
import { MonitorComponent } from "../monitor/monitor.component";
import { ProjectsComponent } from "../projects/projects.component";
import { AiRoleCheckComponent } from "../ai-role-check/ai-role-check.component";
import { ContentService } from '@ng/services/content.service';
import { CommonModule } from '@angular/common';

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

  constructor(
    private content: ContentService
  ) { }

  ngOnInit(): void {
      this.content.typerSub.subscribe((res) => {
        this.typeCodeVisible = res;
      });

      this.content.aiRoleUtility.subscribe((ai) => {
        this.aiVisible = ai;
      });
  }

  protected disableAiRoleCheck() {
    this.aiVisible = false;
  }

  protected closeTyper(): void {
    this.content.typerSub.next(false);
    this.typeCodeVisible = false;
  }
}
