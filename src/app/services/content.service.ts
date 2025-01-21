import { Injectable } from '@angular/core';
import { SectionContent } from '../models/content.model';
import { contentData } from '../assets/content';
import * as fs from 'fs';
import * as path from 'path';

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

  getSections(): SectionContent[] {
    return contentData; 
  }

  returnDadImages(): string[] {
    // return this.getFilesInFolder('../assets/images/dad')
    return dadImages.map((file) => `assets/images/dad/${file}`);
  }

  returnQuirkImages(): string[] {
    return quirkyImages.map((file) => `assets/images/quriky/${file}`);
  }

  // getFilesInFolder(folderPath: string): string[] {
  //   try {
  //     if (!fs.existsSync(folderPath)) {
  //       throw new Error(`Folder not found: ${folderPath}`);
  //     }
  
  //     const items = fs.readdirSync(folderPath);
  
  //     const files = items.filter((item) => {
  //       const fullPath = path.join(folderPath, item);
  //       return fs.statSync(fullPath).isFile();
  //     });
  
  //     return files;
  //   } catch (error) {
  //     console.error('Error reading folder:', error);
  //     return [];
  //   }
  // }
}
