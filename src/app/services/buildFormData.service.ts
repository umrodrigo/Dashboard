import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildFormDataService {
  formData = new FormData();
  
  constructor() { }

  buildFormData(data: any, parentKey?: string): FormData {
    if (!this.formData)
      this.formData = new FormData();

    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          this.buildFormData(data[i], `${parentKey ?? ""}[${i}]`);
        }
      } else {
        Object.keys(data).forEach(key => {
          this.buildFormData(data[key], parentKey ? `${parentKey}.${key}` : key);
        });
      }
    } else if (data !== null && data !== undefined) {
      if (data instanceof Date) {
        data = data.toJSON();
      }
      this.formData.append(parentKey || '', data);
    }
    return this.formData;
  }

  
}
