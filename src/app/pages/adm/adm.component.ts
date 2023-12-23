import { HttpEventType } from '@angular/common/http';
import { ImageService } from './../../services/image.service';
import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IFileData } from 'src/app/models/fileData.interface';
import { ApiService } from 'src/app/services/api.service';
import { BuildFormDataService } from 'src/app/services/buildFormData.service';
import { IEntityPhoto } from 'src/app/models/entityPhoto.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent {
  @ViewChild('selectImageInput') selectImageInput: ElementRef | undefined;
  //listFileInput!: FileList | null;
  listEntityPhoto: IEntityPhoto[] = [];

  constructor(
    private imageService: ImageService,
    private api: ApiService,
    private buildFormData: BuildFormDataService
    ) {}

  onFileChange(event: Event): void {
    let input = event.target as HTMLInputElement;
    this.createBlobAndEntity(input.files);
  }

  clearFileInput() {
    if (this.selectImageInput)
      this.selectImageInput.nativeElement.value = null;
  }

  removeImg(index: number): void {
    this.listEntityPhoto.splice(index, 1);
  }

  async createBlobAndEntity(files: FileList | null): Promise<void> {
    if (files && files.length > 0)
      this.listEntityPhoto = await this.imageService.createEntityPhoto(files);
    
    this.clearFileInput();
  }

  saveListFileData() {
    let list = this.buildFormData.buildFormData(this.listEntityPhoto);
    this.api.saveBlob("photo/postBlob", list)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // Evento de progresso
          const percentDone = Math.round(100 * event.loaded / event.total!);
          console.log('Progresso: ' + percentDone + '%');
        } else if (event.type === HttpEventType.Response) {
          // Evento de resposta completa
          console.log('Upload completo!', event.body);
        }
      }
    );
  }
}
