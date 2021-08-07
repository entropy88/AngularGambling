import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadPdfService {
 

  constructor(private http: HttpClient) { }

  getPdf() {

  
  
    const httpOptions = {
      responseType: 'blob' as 'json',
    
    };
  
    return this.http.get(`http://localhost:8000/api/download`, httpOptions);
  }
}
