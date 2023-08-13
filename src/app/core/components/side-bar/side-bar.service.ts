import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SideBarService {
    isOpen$ = new BehaviorSubject<boolean>(false);
    sideBar$ = new Subject<void>();

    toggle(): void {
        this.sideBar$.next();
        this.isOpen$.next(!this.isOpen$.getValue());
    }
}
