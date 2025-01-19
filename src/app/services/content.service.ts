import { Injectable } from '@angular/core';
import { SectionContent } from '../models/content.model';
import { contentData } from '../assets/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  getSections(): SectionContent[] {
    return contentData; 
  }
}
