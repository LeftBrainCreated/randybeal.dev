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
import QRCode from 'qrcode';
import { nanoid } from 'nanoid';
import { FirestoreService } from '@ng/services/firestore.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-youth-sign-up',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBar,
    FormsModule,
    MatIconModule,
    CommonModule
  ],  templateUrl: './youth-sign-up.component.html',
  styleUrl: './youth-sign-up.component.scss'
})
export class YouthSignUpComponent {
  protected fName: string = "";
  protected lName: string = "";
  protected preview: string = "";
  protected loading: boolean = false;
  protected error: string = "";
  qrCodeUrl: string = '';
  code: string | null = '';
  complete: boolean = false;

  constructor(
    private firestore: FirestoreService,
    private route: ActivatedRoute
  ) { };

  ngOnInit() {
    // ✅ Extract 'code' from the route parameter
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code');
      console.log("Extracted Code:", this.code);
    });
  }

  protected async submitRequest() {
    this.loading = true;

    if (this.code) {
      this.firestore.updateInvitation(this.code, `${this.fName}-${this.lName}`);
      this.complete = true;
    } else {
      try {
        this.fName = this.sanitizeInput(this.fName);
        this.lName = this.sanitizeInput(this.lName);
  
        this.generateQRCode('https://randybeal.dev/youth');
    
        // let result:any = await this.web.send('', RequestType.POST, {
        //   prompt: this.preview
        // })
  
      } catch (ex: any) {

        console.log(ex)
      } finally {
        this.loading = false;
      }
    }

  } 

  protected async generateQRCode(baseUrl: string) {
    const code = nanoid(6); // Generates a short unique 6-character code
    const fullUrl = `${baseUrl}/${code}`;

    await this.firestore.createStudentRecord(`${this.fName}-${this.lName}`, code)
    .then(async () => {
      this.qrCodeUrl = await  QRCode.toDataURL(fullUrl);
      console.log(`QR Code for: ${fullUrl}`);
      console.log(this.qrCodeUrl); // This is a base64 image URL, useful for displaying in a web app
    }).catch((err) => { 
      this.error = 'Please use a different variation of your name, this one is already in use';
      console.error("Error generating QR Code:", err);
    });
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
