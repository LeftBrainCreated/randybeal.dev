import { Component, OnInit } from '@angular/core';
import { ProjectListComponent } from "../project-list/project-list.component";
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { WordCloudComponent } from "../word-cloud/word-cloud.component";
import { ContentService } from '@ng/services/content.service';
import { GitHistProject } from '@ng/models/git-hist-project';
import { ImageStackComponent } from '../image-stack/image-stack.component';
import { CommonModule } from '@angular/common';
import { DisplayService } from '@ng/services/display.service';
import { MobileImageStackComponent } from "../mobile-image-stack/mobile-image-stack.component";

@Component({
  selector: 'app-projects',
  imports: [
    HeaderBarComponent,
    ProjectListComponent,
    WordCloudComponent,
    ImageStackComponent,
    CommonModule,
    MobileImageStackComponent
],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  selectedProject: GitHistProject | undefined = undefined;
  gitHist: GitHistProject[];

  constructor(
    private contentService: ContentService,
    protected display: DisplayService
  ) {
    this.gitHist = this.contentService.getGitHistProjects();
  }
  
  ngOnInit(): void {
    this.contentService.SelectedProjectObs.subscribe((res) => {
      this.selectedProject = this.gitHist.find((gh) => {
        return gh.subject == res;
      })
    })

    setTimeout(() => {
      if (this.selectedProject == undefined) {
        let rand = Math.floor(Math.random() * 9);
        this.contentService.SelectedProjectObs.next(this.gitHist[this.gitHist.length - rand - 1].subject);
      }
    }, 1000)
  }
}
