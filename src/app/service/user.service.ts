import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CustomHttpResponse, Profile } from '../interface/appstates';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly server: String = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  
  login$ = (email: string, password: string) => <Observable<CustomHttpResponse<Profile>>>
    this.http.post<CustomHttpResponse<Profile>>
      (`${this.server}/user/login`, { email, password })
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  verifyCode$ = (email: String, code: String) =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http
        .get<CustomHttpResponse<Profile>>(
          `${this.server}/user/verify/code/${email}/${code}`
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  profile$ = () =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http
        .get<CustomHttpResponse<Profile>>(
          `${this.server}/user/profile`, {headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWZWFzbmEsIExMQyIsImF1ZCI6IkN1c3RvbWVyIE1hbmFnZW1lbnQgU2VydmljZSIsImlhdCI6MTcwMTA2OTg4NSwic3ViIjoiMSIsImF1dGhvcml0aWVzIjpbIlJFQUQ6VVNFUiIsIlJFQUQ6Q1VTVE9NRVIiLCJDUkVBVEU6VVNFUiIsIkNSRUFURTpDVVNUT01FUiIsIlVQREFURTpVU0VSIiwiVVBEQVRFOkNVU1RPTUVSIl0sImV4cCI6MTcwMTA3MTY4NX0.8yRk6k2F-6PkGA1_cngqDymrloJ-VHSGug0WzjLPYl59KRVyvfl3xS-Zh0FBvx3e5x4zXwE_sHyxVbTll5cnzA')}
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );
  update$ = (user: User) =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http
        .patch<CustomHttpResponse<Profile>>(
          `${this.server}/user/update`, user, {headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJWZWFzbmEsIExMQyIsImF1ZCI6IkN1c3RvbWVyIE1hbmFnZW1lbnQgU2VydmljZSIsImlhdCI6MTcwMTA2OTg4NSwic3ViIjoiMSIsImF1dGhvcml0aWVzIjpbIlJFQUQ6VVNFUiIsIlJFQUQ6Q1VTVE9NRVIiLCJDUkVBVEU6VVNFUiIsIkNSRUFURTpDVVNUT01FUiIsIlVQREFURTpVU0VSIiwiVVBEQVRFOkNVU1RPTUVSIl0sImV4cCI6MTcwMTA3MTY4NX0.8yRk6k2F-6PkGA1_cngqDymrloJ-VHSGug0WzjLPYl59KRVyvfl3xS-Zh0FBvx3e5x4zXwE_sHyxVbTll5cnzA')}
        )
        .pipe(tap(console.log), catchError(this.handleError))
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
