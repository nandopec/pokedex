import { Component, OnInit } from '@angular/core';
import { SideBarService } from '../side-bar/side-bar.service';
import { SmartComponent } from '@core/classes/smart-component';

@Component({
    selector: 'pkd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends SmartComponent implements OnInit {
    private _isSidebarOpen = false;

    constructor(private _sideBarService: SideBarService) {
        super();
    }

    ngOnInit(): void {
        this._sideBarService.isOpen$
            .pipe(this.untilComponentDestroy())
            .subscribe((status) => {
                this._isSidebarOpen = status;
            });
    }

    get menuIcon(): string {
        return this._isSidebarOpen ? 'close' : 'menu';
    }

    toggleSidebar(): void {
        this._sideBarService.toggle();
    }
}
