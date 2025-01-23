import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-work-exp',
    templateUrl: './work-exp.component.html',
    standalone: true,
    styleUrl: './work-exp.component.scss'
})
export class WorkExpComponent {

    @Input() screenSize!: number;

}
