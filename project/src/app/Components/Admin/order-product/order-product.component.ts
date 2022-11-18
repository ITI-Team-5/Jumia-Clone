import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../Services/services.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {
  id:any;
  singleorder:any;
  totalty = 0;
  private value;
  @Output() myEvent = new EventEmitter;
  constructor(private myactivated:ActivatedRoute,private myservice:ServicesService, route:Router) {
    
    console.log(myactivated.snapshot.params['id']);
    this.id=myactivated.snapshot.params['id'];
    this.myservice.getByOrderId(this.id).subscribe(
      (data)=> {this.singleorder =data
           this.findsum(this.singleorder);
         console.log(this.singleorder);
        //  console.log(this.findsum(data));
      }
      );
      
      
    }
    
    ngOnInit(): void {
      
    }
    findsum(data){    
      //  this.value=data    
      //  console.log(this.value);  
       for(let j=0;j<data.length;j++){   
            this.totalty+= data[j].totaled  
            // console.log(this.totalty)  
       }  
       
    }  
}
  