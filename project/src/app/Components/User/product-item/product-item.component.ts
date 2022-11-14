import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  
  imgsrc= 'http://localhost:8000/storage/images';

  cartItem :any;
  constructor(private myservice:ServicesService, private route: ActivatedRoute) { 
    this.myservice.cartSubject.subscribe((data)=>{
      this.cartItem = data;
    })
  }
   quantity:number=1;
   @Input() product:any={};
   @Output() item=new EventEmitter()
    ngOnInit(): void {
  //  this.CartItemFun(this.cartNum)
  }

  plus()
  {
    this.quantity++;
    console.log(this.quantity);
    this.CartItemFun(this.cartItem);
  }
  minus()
  {
    this.quantity--;
    if(this.quantity <1)
    {
      this.quantity =1;
    }
    console.log(this.quantity);
    this.CartItemFun(this.cartItem);
  }
  Addtocart()
  {
    this.product.quanity=this.quantity;
    this.item.emit(this.product);
    this.CartItemFun(this.cartItem);
    
  }

  CartItemFun(qty:any){
    var CartCount = JSON.parse(localStorage.getItem('cart')) 
    var totalCount = 0;
    if(localStorage.getItem('cart')){
      for(let i = 0; i < CartCount.length ; i++){
         totalCount += CartCount[i].quanity
      }
      
        console.log(totalCount);
        this.cartItem = totalCount;
    }
    this.myservice.cartSubject.next(this.cartItem);
  }
 
}
