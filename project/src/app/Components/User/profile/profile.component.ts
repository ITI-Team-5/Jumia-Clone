import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  LoggedInAdmin: any;
  isVerified = false;
  verifiedDate:any;
  constructor(private myservice:ServicesService,activatedroute:ActivatedRoute) { }
  profile:any;
  id = localStorage.getItem('UserId') ;
  orders:any[]=[];
  ngOnInit(): void {
    // this.LoggedInAdmin = localStorage.getItem("userType")
    // if(this.LoggedInAdmin != 'user'){
    //     window.location.href = '/admin';
    // }
    this.myservice.getByProfileId(this.id).subscribe((data)=>{
      this.profile = data;
       this.verifiedDate=this.profile['users'].email_verified_at
       if(this.verifiedDate != null)
       {
        this.isVerified =true;
       }
    
    })

  }
  DeleteOrder(order_id:any){
    //console.log(order_id);
    this.myservice.DeleteOrd(order_id).subscribe((data)=>{
     // console.log(data);
      window.location.href = "/profiles";
    })
  }
  Orderchange(o_id:any){
   // console.log(o_id);
    for(let p of this.profile.productsorders){
      if(o_id == p.order_id){
    console.log(p);
        this.orders.push(p);
      }
  }
  }
  orderdelete(){
    this.orders = [];
  }

  SendVerificarionEmail()
  {
    this.myservice.resendVerify().subscribe((data)=>{
      console.log(data);
    })
  }

  // isVerified()
  // {
    
  //   let id = localStorage.getItem('UserId');
  //   console.log(id);
  //   this.myservice.Verify(id).subscribe((data)=>{
  //     console.log(data)
  //     if (data != null)
  //     {
  //       this.Flag = true;
  //       this.verifiedDate= data;
  //     }
  //   })
  // }
}
