import { Component } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
constructor (private navigationService: NavigationService){}

onClickGoToPage(pageName: string) {
    this.navigationService.goToPage(pageName);
  }
}
