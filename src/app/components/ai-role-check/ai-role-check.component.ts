import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { WebService, RequestType } from '@ng/services/web.service';
import { ContentService } from '@ng/services/content.service';
import { MatProgressBar } from '@angular/material/progress-bar';


const AI_URI = 'https://us-central1-randybeal-dev.cloudfunctions.net/aiRoleCheck';

@Component({
  selector: 'app-ai-role-check',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBar,
    FormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './ai-role-check.component.html',
  styleUrl: './ai-role-check.component.scss'
})
export class AiRoleCheckComponent {

  protected prompt: string = "";
  // protected executed: boolean = false;
  protected promptResult: string | undefined;
  protected loading: boolean = false;

  constructor(
    private web:WebService,
    private content: ContentService
  ) { };

  protected async submitRequest() {
    this.loading = true;

    try {
      let p = this.sanitizeInput(this.prompt);
  
      let result:any = await this.web.send(AI_URI, RequestType.POST, {
        prompt: p
      })
  
      this.promptResult = result.data.content;
    } catch (ex: any) {
      console.log(ex)
    } finally {
      this.loading = false;
    }
  } 

  protected disableRoleCheck(): void {
    this.content.aiRoleUtility.next(false);
  }

  private sanitizeInput(input: string): string {
    return input
      .replace(/</g, "&lt;") // Replace < with &lt;
      .replace(/>/g, "&gt;") // Replace > with &gt;
      .replace(/\\/g, "\\\\") // Escape backslashes
      .replace(/"/g, '\\"') // Escape double quotes
      .replace(/\n/g, "\\n") // Escape newlines
      .replace(/\r/g, "\\r") // Escape carriage returns
      .trim(); // Remove leading and trailing whitespace
  }
}
