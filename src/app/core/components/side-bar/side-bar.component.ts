import { Component, ElementRef, ViewChild } from '@angular/core';
import { SideBarService } from './side-bar.service';

@Component({
    selector: 'pkd-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
    @ViewChild('drawer') drawer: any;

    constructor(private _sidebarService: SideBarService) {
        this._sidebarService.sideBar$.subscribe(() => {
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
