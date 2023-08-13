import { Component, ElementRef, ViewChild } from '@angular/core';
import { SideBarService } from './side-bar.service';
import { SmartComponent } from '@core/classes/smart-component';

@Component({
    selector: 'pkd-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent extends SmartComponent {
    @ViewChild('drawer') drawer: any;

    constructor(private _sidebarService: SideBarService) {
        super();
        this._sidebarService.sideBar$
            .pipe(this.untilComponentDestroy())
            .subscribe(() => {
                this._toggleSidebar();
            });
    }

    closeSidebar(): void {
        this._sidebarService.toggle();
    }

    private _toggleSidebar(): void {
        this.drawer.toggle();
    }
}
