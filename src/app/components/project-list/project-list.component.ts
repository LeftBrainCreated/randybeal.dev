import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommitOptions, createGitgraph, BranchOptions } from "@gitgraph/js";
import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { ContentService } from '@ng/services/content.service';




@Component({
  selector: 'app-project-list',
  imports: [],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit, AfterViewChecked {
  selectedCommit: string | null = null;

  @Input() screenSize: number = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private content: ContentService,
    private cdr: ChangeDetectorRef
  ) {

  }
  ngAfterViewChecked(): void {
    this.cleanRenderedText();
  }

  onCommitDotClick = (commit: any, index: number) => {
    console.log('Commit dot clicked:', commit);
  };

  // onCommitMessageClick = (commit: any, index: number) => {
  //   console.log('Commit message clicked:', commit);
  //   this.selectedCommit = commit.subject; 
  //   this.content.SelectedProjectObs.next(commit.subject);
  // };

  isSelected(commit: any): boolean {
    return this.selectedCommit === commit.subject;
  }

  ngOnInit(): void {
    this.content.SelectedProjectObs.subscribe((res) => {
      let e = this.getTextElementByContent(res);

      if (e) {
        this.highlightElement(e);
      }
    });

    const graphContainer = document.getElementById("graph-container");
    const ggOptions: any = {
      orientation: this.screenSize == 0 ? "vertical" : "horizontal",
      template: "blackarrow",
    }
    const gitgraph = createGitgraph(graphContainer!, ggOptions);

    const observer = new MutationObserver(() => {
      const textElements = document.querySelectorAll('div#graph-container text');
      textElements.forEach((el) => {
        if (el instanceof SVGTextElement) {
          el.style.cursor = 'pointer';
  
          el.classList.remove('selected');
        }
      });
    });
    
    const targetNode = document.querySelector('#graph-container');
    if (targetNode !== null) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }

    let content = this.content.getGitHistProjects();
    let i = 0;

    content.forEach((c) => {
      let branch = gitgraph.branch(c.branch);
      branch.commit({
        author: '',
        hash: i.toString().padStart(2, '0'),
        subject: c.subject,
        onMessageClick: () => this.onCommitMessageClick(c, i),
        onMouseOver:  () => this.onCommitDotClick(c, i),
        // style: {
        //   label: {
        //     strokeColor: '#919191',
        //   }
        // }
      });

      i++;

      if (c.merge) {
        // let merge = gitgraph.branch(c.merge);
        // merge.merge(c.branch, 'merge');
        let options: CommitOptions = {
          tag: c.tag,
          subject: 'merge',
          onMessageClick: undefined,
          onMouseOver: undefined
        }
        
        let merge = gitgraph.branch(c.merge);
        merge.merge({
          branch: c.branch,
          commitOptions: options
        } );
      }
    })

    setTimeout(() => {
      this.cleanRenderedText();
    }, 500)

  }

  onCommitMessageClick = (commit: any, index: number) => {
    console.log('Commit message clicked:', commit);
  
    const textElements = document.querySelectorAll('div#graph-container text');
  
    // Reset styles for all text elements
    textElements.forEach((el) => {
      if (el instanceof SVGTextElement) {
        el.style.fill = ''; // Reset to default
        el.style.fontWeight = '';
        el.style.textShadow = '';
        el.style.backgroundColor = '';
        el.style.fontSize = '';
        el.style.border = '';
      }
    });
  
    // Apply styles to the selected element
    const clickedElement = this.getTextElementByContent(commit.subject);
  
    if (clickedElement) {
      this.highlightElement(clickedElement);
    }
    
    this.content.SelectedProjectObs.next(commit.subject);
  };
  
  private highlightElement(el: SVGTextElement): void {
    el.style.fill = '#ddd';
    el.style.fontWeight = 'bold'; // Bold font
    el.style.fontSize = '28px';
    el.style.textShadow = '1px 1px 2px #000'; // Text shadow
    el.style.backgroundColor = '#cccccc40';
    el.style.border = '1px solid #ccc';
  }

  private getTextElementByContent(subject: string): SVGTextElement | null {
    const textElements = document.querySelectorAll('div#graph-container text');
  
    const element = Array.from(textElements).find(
      (el) => el.textContent === subject
    ) as SVGTextElement;

    if (!element) {
      return null;
    } else {
      return element;
    }
  }

  private cleanRenderedText(): void {
    const textElements = this.document.querySelectorAll('text');
    textElements.forEach((textElement) => {
      const originalContent = textElement.textContent || '';
      if (originalContent.includes('-  <>')) {
        const cleanedContent = originalContent.replace(/ -  <>$/, '');
        textElement.textContent = cleanedContent.substring(3);
      }
      if (originalContent.includes('merge')) {
        textElement.textContent = '';
      }
    });
  }
}


