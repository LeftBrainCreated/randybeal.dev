import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GitHistProject, TechWeight } from '@ng/models/git-hist-project';
import { ContentService } from '@ng/services/content.service';

@Component({
  selector: 'app-word-cloud',
  imports: [CommonModule],
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss'],
})
export class WordCloudComponent implements OnInit {
  content: GitHistProject[];
  techWeights?: TechWeight[];
  techPositions: { name: string; top: string; left: string; rotation: string }[] = [];
  selectedSkills: string[] = [];

  constructor(private contentService: ContentService) {
    this.content = contentService.getGitHistProjects();
  }

  ngOnInit(): void {
    this.techWeights = this.consolidateTechWeights(this.content);

    if (this.techWeights) {
      this.techPositions = this.generateNonOverlappingPositions(this.techWeights);
    }

    this.contentService.SelectedProjectObs.subscribe((res) => {
      let selected = this.content.find((c) => {
        return c.subject == res;
      })

      this.selectedSkills.forEach((skill) => {
        let el: HTMLElement = document.getElementById(`skill-${skill}`)!;

        if (el) {
          this.removeHoverEffect(el);
        }
      });

      this.selectedSkills = selected?.techStack!;

      this.selectedSkills.forEach((skill) => {
        let el: HTMLElement = document.getElementById(`skill-${skill}`)!;

        if (el) {
          this.addHoverstyle(el);
        }
      })

    })

    // Add highlighting behavior dynamically for elements
    this.addHoverEffect();
  }

  consolidateTechWeights = (gitHistContent: GitHistProject[]): TechWeight[] => {
    const techWeights: { [key: string]: number } = {};

    gitHistContent.forEach((item) => {
      const techs = [...(item.techStack || [])];

      techs.forEach((tech) => {
        if (techWeights[tech]) {
          techWeights[tech]++;
        } else {
          techWeights[tech] = 1;
        }
      });
    });

    return Object.entries(techWeights).map(([name, weight]) => ({ name, weight }));
  };

  addHoverEffect(): void {
    setTimeout(() => {
      const elements = document.querySelectorAll('.techstack-item');

      elements.forEach((element) => {
        const el = element as HTMLElement;

        el.addEventListener('mouseover', () => {
          this.addHoverstyle(el, 11);
        });

        el.addEventListener('mouseout', () => {
          if (this.selectedSkills.indexOf(el.id.substring(6)) == -1) {
            this.removeHoverEffect(el);
          } else {
            el.style.zIndex = '10'; 
          }
        });
      });
    });
  }

  private addHoverstyle(e: HTMLElement, z: number = 10) {
          e.setAttribute('data-rotation', e.style.transform);
          e.style.zIndex = z.toString();
          e.style.transform = 'scale(1.2)';
          e.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.style.color = '#1e1e2e';
  }

  private removeHoverEffect(e: HTMLElement) {
          e.style.zIndex = '1';
          e.style.transform = 'scale(1)';
          e.style.backgroundColor = 'rgba(30, 30, 46, 0.8)';
          e.style.color = '#555';
          e.style.transform = e.getAttribute('data-rotation') || '0';
  }

  generateNonOverlappingPositions(items: TechWeight[]): { name: string; top: string; left: string; rotation: string }[] {
    const positions: { top: number; left: number; rotation: string }[] = [];

    items.forEach((item) => {
      let top: number, left: number;
      let overlap: boolean;

      // Try until a non-overlapping position is found
      let i = 0;

      do {
        top = this.getRandomPosition();
        left = this.getRandomWidth();
        overlap = positions.some(
          (pos) => Math.abs(pos.top - top) < 10 && Math.abs(pos.left - left) < 10
        );
        i++;
      } while (overlap && i < 15);

      positions.push({ top, left, rotation: `rotate(${this.getRandomRotation()}deg)` });
    });

    return items.map((item, index) => ({
      name: item.name,
      top: `${positions[index].top}%`,
      left: `${positions[index].left}%`,
      rotation: positions[index].rotation,
    }));
  }  

  getRandomPosition(): number {
    return Math.random() * 70 + 0; // Random percentage between 10% and 90%
  }

  getRandomWidth(): number {
    return Math.random() * 90 + 0; // Random percentage between 10% and 90%
  }

  getRandomRotation(): number {
    return Math.random() * 20 - 10; // Random rotation between -10 and +10 degrees
  }
}
