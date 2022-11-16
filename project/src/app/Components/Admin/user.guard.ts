import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './Services/services.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private myservice:ServicesService,private route:Router){}
  canActivate(){
    if(this.myservice.isUser()){
      return true;
    }else{
      window.location.href = "/admin"
      return false;
    }
  }
  
}
