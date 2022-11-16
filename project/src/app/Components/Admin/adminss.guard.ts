import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './Services/services.service';

@Injectable({
  providedIn: 'root'
})
export class AdminssGuard implements CanActivate {
  constructor(private route:Router, private myservice:ServicesService){}
  canActivate()
  {
    if(this.myservice.isAdmin()){
      return true;
    }else{
      this.route.navigate(['/'])
      return false
    }
    
  }
  
}
