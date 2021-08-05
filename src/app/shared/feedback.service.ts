import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Feedback } from './feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  AddFeedback(data: Feedback): Observable<any> {
    let API_URL = `${this.endpoint}/add-feedback`;
    return this.http.post(API_URL, data)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  getFeedbackById(id:any):Observable<any>{
    let API_URL = `${this.endpoint}/get-feedback/${id}`;
    return this.http.get(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  UpdateFeedback(id: any, text: any): Observable<any> {
    let API_URL = `${this.endpoint}/update-feedback/${id}`;
    return this.http.put(API_URL, text)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  GetFeedback():Observable<any>{
    let API_URL = `${this.endpoint}/get-feedback`;
    return this.http.get(API_URL)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  DeleteFeedback(id:any):Observable<any>{
    let API_URL=`${this.endpoint}/delete-feedback/${id}`;
    return this.http.get(API_URL, {responseType: 'text'}) 
    .pipe(
      catchError(this.errorMgmt)
    )
  }

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
