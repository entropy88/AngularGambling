import { Injectable } from '@angular/core';
import { Chapter } from './classes/chapter';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ChapterService {

  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  

  GetChapterByChapterNumber(chNumber:string):Observable<any>{
    let API_URL=`${this.endpoint}/get-chapter/${chNumber}`;
    console.log(API_URL)
    return this.http.get(API_URL)
  .pipe(
    catchError(this.errorMgmt)
  )
   
  }


 
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }

}