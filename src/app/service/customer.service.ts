import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CustomHttpResponse, Page } from '../interface/appstates';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  private readonly server: String = 'http://localhost:8080';

  constructor(private http: HttpClient) {}


  customer$ = (page: number = 0) => <Observable<CustomHttpResponse<Page & User>>>
    this.http.get<CustomHttpResponse<Page & User>>
      (`${this.server}/customer/list?page=${page}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );



  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
        console.log(errorMessage);
      } else {
        errorMessage = `An error occurred - Error status ${error.status}`;
      }
    }
    return throwError(() => errorMessage);
  }
}
