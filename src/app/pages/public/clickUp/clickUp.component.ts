import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-click-up',
    templateUrl: './clickUp.component.html',
    styleUrl: './clickUp.component.css',
    //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickUpComponent { 
    active = 1;
}
