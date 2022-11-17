import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './Services/services.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{
  constructor(private route:Router, private myservice:ServicesService){}
  canActivate(){
    {
      if(this.myservice.isAdmin()){
        return true;
      }else{
        
        return this.route.navigate(['/login']);
      }
    }
  
  }
}