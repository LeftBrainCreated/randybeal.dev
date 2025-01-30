import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ai-role-check',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './ai-role-check.component.html',
  styleUrl: './ai-role-check.component.scss'
})
export class AiRoleCheckComponent {

  protected prompt: string = "";
  protected executed: boolean = false;

}
