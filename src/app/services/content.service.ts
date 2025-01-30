import { Injectable } from '@angular/core';
import { SectionContent } from '../models/content.model';
import { contentData } from '../assets/content';
import { gitHistContent } from '../assets/git-hist';
import { Subject } from 'rxjs';
import { GitHistProject } from '@ng/models/git-hist-project';

const dadImages = [
  "img_1.jpg",
  "img_2.jpg",
  "img_3.jpg",
  "img_4.jpg",
  "img_5.jpg",
  "img_6.jpg",
  "img_7.jpg",
  "img_8.jpeg",
]

const quirkyImages = [
  "img_1.jpg",
  "img_2.jpg",
  "img_3.jpg",
  "img_4.jpg",
  "img_5.jpg",
]

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  public SelectedProjectObs = new Subject<string>();

  getSections(): SectionContent[] {
    return contentData; 
  }

  returnDadImages(): string[] {
    return dadImages.map((file) => `assets/images/dad/${file}`);
  }

  returnQuirkImages(): string[] {
    return quirkyImages.map((file) => `assets/images/quriky/${file}`);
  }

  getGitHistProjects(): GitHistProject[] {
    return gitHistContent;
  }

  public closeContactCard = new Subject<void>();
}
