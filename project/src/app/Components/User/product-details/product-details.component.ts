import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  singleProduct:any;
  id:any;
  productsInCart:any[]=[]

  imgsrc= 'http://localhost:8000/storage/images';

  quantity:number=1;
  // @Input() product:any={};
  @Output() item=new EventEmitter()

  constructor(private myserv:ServicesService ,private myactivrout:ActivatedRoute) 
  {
    this.id=myactivrout.snapshot.params['id'];

    //  this.myserv.getByIdshow(this.id).subscribe(
    //  (data)=> this.singleProduct =data
     //);

     this.myserv.getById(this.id).subscribe(
      (data)=> this.singleProduct =data
     );


   }

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

  addtocart(){

    if("cart" in localStorage)
    {
      this.productsInCart=JSON.parse(localStorage.getItem("cart")!); // updated array -- ! to escape null
      let exist = this.productsInCart.find(item => item.id == this.singleProduct.id);
      if(exist){
        alert('Item Already chosen')
      }
      else
      {
        this.singleProduct.quanity=this.quantity;
        this.productsInCart.push(this.singleProduct);
        localStorage.setItem('cart',JSON.stringify(this.productsInCart) )

      }

    }
    else
    {
      this.singleProduct.quanity=this.quantity;
      this.productsInCart.push(this.singleProduct);
      localStorage.setItem('cart',JSON.stringify(this.productsInCart) )
    }

    window.location.href='/'

  }

}
