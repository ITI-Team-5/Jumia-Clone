import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  
  imgsrc= 'http://localhost:8000/storage/images';

  constructor() { }
   quantity:number=1;
   @Input() product:any={};
   @Output() item=new EventEmitter()
    ngOnInit(): void {
   
  }

  plus()
  {
    this.quantity++;
  }
  minus()
  {
    this.quantity--;
    if(this.quantity <1)
    {
      this.quantity =1;
    }
  }
  Addtocart()
  {
    this.product.quanity=this.quantity;
    this.item.emit(this.product);
  }

}
