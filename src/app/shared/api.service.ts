import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add student
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.endpoint}/add-user`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  GetUserByUsername(username:string):Observable<any>{
    let API_URL=`${this.endpoint}/get-user/${username}`;
    console.log(API_URL)
    return this.http.get(API_URL)
  .pipe(
    catchError(this.errorMgmt)
  )
   
  }

  
  GetUsers() {
    return this.http.get(`${this.endpoint}/get-users`);
  }

  

  // // Update student
  // UpdateStudent(id, data): Observable<any> {
  //   let API_URL = `${this.endpoint}/update-student/${id}`;
  //   return this.http.put(API_URL, data, { headers: this.headers })
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }

  // // Delete student
  // DeleteStudent(id): Observable<any> {
  //   var API_URL = `${this.endpoint}/delete-student/${id}`;
  //   return this.http.delete(API_URL)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }

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
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}