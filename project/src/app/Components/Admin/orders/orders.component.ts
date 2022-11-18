import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../Services/services.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public fb:FormBuilder,private route:ActivatedRoute ,private myservice:ServicesService) { 
    this.form = this.fb.group({
   
      status: ''
    })
  }
  status:any;
  orders:any;
  form: FormGroup;
  ngOnInit(): void {
    let that = this;
    this.myservice.getAllOrders().subscribe((data:any)=>{
      that.orders = data;
      console.log(data);
    })
  }
  
  // updatedata(value:any){
  //   let body = {
  //     status: value.status
  //   }
  //   this.myservice.UpdateOrder()
  // }


    UpdateOrder(id:any){
     const form: any = new FormData();
     form.append('status', this.form.controls['status'].value);
      console.log(form);
       form.append('_METHOD', 'PUT');
     this.myservice.UpdateOrder(form,id).subscribe((data)=>{
      console.log(data);
      //  window.location.href="/order";
      })
    }

}
