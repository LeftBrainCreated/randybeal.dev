export interface ButtonContent {
    name: string;
    techStack: string[];
    description: string;
    images: string[];
    link?: string[];
  }
  
  export interface SectionContent {
    section: string;
    buttons: ButtonContent[];
  }