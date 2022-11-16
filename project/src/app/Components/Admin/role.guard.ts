import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './Services/services.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private myservice:ServicesService,private route:Router){}
  canActivate()
  {
    // if(this.myservice.HasAccess()){
    //   return true;
    // }else{
    //   window.location.href="/";
    //   return false;
    // };
    return true
    
  }
  
}
