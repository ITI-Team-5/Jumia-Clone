import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  
  imgsrc= 'http://localhost:8000/storage/images';
  cartNum:number=0;

  constructor(private myservice:ServicesService) { }
   quantity:number=1;
   @Input() product:any={};
   @Output() item=new EventEmitter()
    ngOnInit(): void {
   
  }

  plus()
  {
    this.quantity++;
    console.log(this.quantity);
    // this.CartItemFun(this.quantity-1);
  }
  minus()
  {
    this.quantity--;
    if(this.quantity <1)
    {
      this.quantity =1;
    }
    console.log(this.quantity);
    // this.CartItemFun(this.quantity-1);
  }
  Addtocart()
  {
    this.product.quanity=this.quantity;
    this.item.emit(this.product);
    // this.CartItemFun(this.quantity-1);
  }
  // CartItemFun(qty:any){
  //     var CartValue = JSON.parse(localStorage.getItem('cart')) ;
  //     this.cartNum = CartValue.length;
  //     this.myservice.cartSubject.next(this.cartNum);
  //    console.log(this.cartNum);
  // }
 
}
