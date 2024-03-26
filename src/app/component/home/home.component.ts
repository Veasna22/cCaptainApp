import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from 'src/app/enum/datastate.enum';
import { CustomHttpResponse, Page } from 'src/app/interface/appstates';
import { Customer } from 'src/app/interface/customer';
import { State } from 'src/app/interface/state';
import { User } from 'src/app/interface/user';
import { CustomerService } from 'src/app/service/customer.service';
import { UserService } from 'src/app/service/user.service';
import { EventType } from './../../enum/event-type.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeState$: Observable<State<CustomHttpResponse<Page & User>>>;
  private dataSubject = new BehaviorSubject<CustomHttpResponse<Page & User>>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  private showLogsSubject = new BehaviorSubject<boolean>(false);
  showLogs$ = this.isLoadingSubject.asObservable();
  readonly DataState = DataState;
  readonly EventType = EventType;


  constructor(private userService: UserService, private cusomerService: CustomerService) {}

  ngOnInit(): void {
    this.homeState$ = this.cusomerService.customer$().pipe(
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
          error,
        })
      })
    );
  }

  goToPage(pageNumber?: number): void {
    this.homeState$ = this.cusomerService.customer$(pageNumber).pipe(
      map(response => {
        console.log(response);
        this.dataSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        this.dataSubject.next(response);
        return {
          dataState: DataState.LOADED,
          appData: response
        };
      }),
      startWith({
        dataState: DataState.LOADED,
        appData: this.dataSubject.value
      }),
      catchError((error: string) => {
        console.error('Error occurred: ', error);
        return of({
          dataState: DataState.ERROR,
          error,
          appData: this.dataSubject.value,
        })
      })
    );
  }

  goToNextOrPreviousPage(direction?: string): void {
    this.goToPage(direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

  selectCustomer(customer : Customer): void {
    console.log(customer);
  }

}
