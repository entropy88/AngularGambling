import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({  providedIn: 'root'})
export class DataSharingService {
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());


    private hasToken() : boolean {
        return !!localStorage.getItem('loggedUserUsername');
      }
}