import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';
import { SideBarService } from '../side-bar/side-bar.service';

@Component({
    selector: 'pkd-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    private _isSidebarOpen = false;

    constructor(private _sideBarService: SideBarService) {}

    ngOnInit(): void {
        this._sideBarService.isOpen$.subscribe((status) => {
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
