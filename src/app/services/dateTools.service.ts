import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateToolsService {
  private options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  constructor() { }

  newDate(): string {
    let date = new Date();
    return date.toLocaleDateString('pt-BR', this.options);
  }

  formatDate(dateString: string | number): string {
    let date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', this.options);
  }

  sortByStart_date(a: any, b: any) {
    let dateA = new Date(a.start_date.split('/').reverse().join('-'));
    let dateB = new Date(b.start_date.split('/').reverse().join('-'));
    return dateA.getTime() - dateB.getTime();
  }
}