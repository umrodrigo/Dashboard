import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BuildFormDataService } from './buildFormData.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private buildFormData: BuildFormDataService) { }

  private createHeaders(): HttpHeaders {
    // Aqui você pode adicionar headers personalizados, se necessário
    return new HttpHeaders();
  }

  private createParams(params: any): HttpParams {
    // Aqui você pode criar os parâmetros opcionais para a requisição GET
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return httpParams;
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    const headers = this.createHeaders();
    const httpParams = this.createParams(params);
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers, params: httpParams });
  }

  post<T>(endpoint: string, body: object): Observable<T> {
    const headers = this.createHeaders();
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, { headers });
  }

  put<T>(endpoint: string, id: string, body: object): Observable<T> {
    const headers = this.createHeaders();
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, body, { headers });
  }

  delete<T>(endpoint: string, id: string): Observable<T> {
    const headers = this.createHeaders();
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}/${id}`, { headers });
  }

  save<T>(endpoint: string, body: object, id?: string): Observable<T> {
    if (id) {
      return this.put<T>(endpoint, id, body);
    } else {
      return this.post<T>(endpoint, body);
    }
  }

  saveBlob<T>(endpoint: string, body: object): Observable<HttpEvent<T>> {
    const headers = this.createHeaders();
    headers.append("Content-type", "undefined");
    return this.http.post<T>(
      `${this.apiUrl}${endpoint}`, 
      body, 
      { 
        headers, 
        reportProgress: true,
        observe: 'events'
      });
  }
}

