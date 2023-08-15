import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goToPage(pageName: string,optionalParam?: string) {
    let routeParams:any = { };
    if(optionalParam){
      routeParams['uId'] = optionalParam;
    }
    this.router.navigate([`/${pageName}`],{queryParams:routeParams});
  }
}
