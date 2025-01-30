import { Component } from '@angular/core';
import { MonitorComponent } from "../monitor/monitor.component";
import { ProjectsComponent } from "../projects/projects.component";
import { AiRoleCheckComponent } from "../ai-role-check/ai-role-check.component";

@Component({
  selector: 'app-welcome',
  imports: [MonitorComponent, AiRoleCheckComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

}
