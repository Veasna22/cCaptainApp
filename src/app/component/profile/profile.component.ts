import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Profile } from 'src/app/interface/appstates';
import { State } from 'src/app/interface/state';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileState$: Observable<State<CustomHttpResponse<Profile>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Profile>>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  readonly DataState = DataState;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.profileState$ = this.userService.profile$().pipe(
      map(response => {
        console.log(response);
        this.dataSubject.next(response);
        return {
          dataState: DataState.LOADED,
          appData: response
        };
      }),
      startWith({
        dataState: DataState.LOADING,
        appData: null
      }),
      catchError((error: string) => {
        console.error('Error occurred: ', error);
        return of({
          dataState: DataState.ERROR,
          appData: null,
          error,
        })
      })
    );
  }
  
  updateProfile(profileForm: NgForm): void {
    this.isLoadingSubject.next(true);
    this.profileState$ = this.userService.update$(profileForm.value).pipe(
      map(response => {
        console.log(response);
        this.dataSubject.next({ ...response , data: response.data });
        this.isLoadingSubject.next(false);
        return {
          dataState: DataState.LOADED,
          appData: this.dataSubject.value
        };
      }),
      startWith({
        dataState: DataState.LOADED,
        appData: this.dataSubject.value
      }),
      catchError((error: string) => {
        this.isLoadingSubject.next(false);
        return of({
          dataState: DataState.LOADED,
          appData: this.dataSubject.value,
          error
        })
      })
      )
    
  }

  updateRole(roleForm: NgForm): void {
    this.isLoadingSubject.next(true);
    this.profileState$ = this.userService.updateRole$(roleForm.value.roleName).pipe(
      map(response => {
        console.log(response);
        this.dataSubject.next({ ...response , data: response.data });
        this.isLoadingSubject.next(false);
        return {
          dataState: DataState.LOADED,
          appData: this.dataSubject.value
        };
      }),
      startWith({
        dataState: DataState.LOADED,
        appData: this.dataSubject.value
      }),
      catchError((error: string) => {
        this.isLoadingSubject.next(false);
        return of({
          dataState: DataState.LOADED,
          appData: this.dataSubject.value,
          error
        })
      })
      )
    
  }

  updatePassword(passwordForm: NgForm): void {
    this.isLoadingSubject.next(true);
    if(passwordForm.value.newPassword === passwordForm.value.comfirmNewPassword){
      this.profileState$ = this.userService.updatePassword$(passwordForm.value).pipe(
        map(response => {
          console.log(response);
          passwordForm.reset();
          this.isLoadingSubject.next(false);
          return {
            dataState: DataState.LOADED,
            appData: this.dataSubject.value
          };
        }),
        startWith({
          dataState: DataState.LOADED,
          appData: this.dataSubject.value
        }),
        catchError((error: string) => {
          passwordForm.reset();
          this.isLoadingSubject.next(false);
          return of({
            dataState: DataState.LOADED,
            appData: this.dataSubject.value,
            error
          })
        })
        )
      }else{
        passwordForm.reset();
        this.isLoadingSubject.next(false);
      }
    
  }
 
  updateAccountSettings(settingsForm: NgForm): void {
    this.isLoadingSubject.next(true);
    this.profileState$ = this.userService.updateAccountSettings$(settingsForm.value).pipe(
      map(response => {
        console.log(response);
        this.dataSubject.next({ ...response , data: response.data });
        this.isLoadingSubject.next(false);
        return {
          dataState: DataState.LOADED,
          appData: this.dataSubject.value
        };
      }),
      startWith({
        dataState: DataState.LOADED,
        appData: this.dataSubject.value
      }),
      catchError((error: string) => {
        this.isLoadingSubject.next(false);
        return of({
          dataState: DataState.LOADED,
          appData: this.dataSubject.value,
          error
        })
      })
      )
    
  }

  toggleMfa(): void {
    this.isLoadingSubject.next(true);
    this.profileState$ = this.userService.toggleMfa$().pipe(
      map(response => {
        console.log(response);
        this.dataSubject.next({ ...response , data: response.data });
        this.isLoadingSubject.next(false);
        return {
          dataState: DataState.LOADED,
          appData: this.dataSubject.value
        };
      }),
      startWith({
        dataState: DataState.LOADED,
        appData: this.dataSubject.value
      }),
      catchError((error: string) => {
        this.isLoadingSubject.next(false);
        return of({
          dataState: DataState.LOADED,
          appData: this.dataSubject.value,
          error
        })
      })
      )
    
  }
}
