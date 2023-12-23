import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { envClickUp } from '../../../../environments/environment';

@Component({
    selector: 'app-click-up',
    templateUrl: './clickUp.component.html',
    styleUrl: './clickUp.component.css',
    //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickUpComponent { 
    activeTab = 1;
    loadingSpinner = false;

    clickUpFolders: any;

    constructor(private apiService: ApiService) {}

    async ngOnInit() {
        this.loadingSpinner = true;
        await this.getClickUpData();
    }

    getClickUpData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService
                .get(envClickUp.folders)
                .subscribe({
                    next: (data: any) => {
                        this.loadingSpinner = false;
                        this.clickUpFolders = data;
                        console.log(data);
                        resolve(data);
                    },
                    error: error => {
                        this.loadingSpinner = false;
                        reject(error);
                    }
                });
        });
    }

    
}
