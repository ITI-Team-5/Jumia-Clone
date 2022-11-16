import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './Services/services.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router:Router, private myservice:ServicesService){}
  canActivate() {
return true
      // if(this.myservice.IsLoggedIn()){
      //   return true;
      // }else{
      //   window.location.href = "/login"
      //   return false
      // }
  }
  
}
