import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
title:any;
cartItem :any;
imgsrc= 'http://localhost:8000/storage/images';
  constructor(private myservice:ServicesService,route:Router,private activatedroute:ActivatedRoute) { 
    console.log(this.activatedroute);
    let x = this.activatedroute.snapshot.params['title'];    
    this.myservice.searchbyTitle(x).subscribe(data=>{
    this.title = data;
    this.imgsrc= 'http://localhost:8000/storage/images';

    console.log(data);
   })
  }
  quantity:number=1;
   @Input() product:any={};
   @Output() item=new EventEmitter()
  // products:any;
  // page:number = 1;
  // total:number = 0;
  // productss:any[]=[];
  // @Input() navItem:any;
  // ngOnChanges(changes: SimpleChanges): void {
   
  //   console.log(this.navItem);
  //   if(changes['navItem'].currentValue.title){
  //     this.productss.filter(this.navItem);
  //   }

  // }
  ngOnInit(): void {
  
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
