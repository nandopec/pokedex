import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { SmartComponent } from '@core/classes/smart-component';
import { SideBarService } from '@core/components/side-bar/side-bar.service';

@Component({
    selector: 'pkd-home',
    templateUrl: './home.layout.html',
    styleUrls: ['./home.layout.scss'],
})
export class HomeLayout extends SmartComponent implements OnInit {
    isSidebarOpen = false;

    constructor(private _sideBarService: SideBarService) {
        super();
    }

    ngOnInit(): void {
        this._sideBarService.isOpen$
            .pipe(this.untilComponentDestroy())
            .subscribe((status) => {
                this.isSidebarOpen = status;
            });
    }

    closeSidebar(): void {
        if (this.isSidebarOpen) {
            this._sideBarService.toggle();
        }
    }
}
