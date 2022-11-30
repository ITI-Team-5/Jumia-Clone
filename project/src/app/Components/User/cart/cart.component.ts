import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Router } from '@angular/router';
import { ServicesService } from '../../Admin/Services/services.service';
import {render} from 'creditcardpayments/creditCardPayments' ;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productsInCart:any[]=[]
  total:any=0;

  imgsrc= 'http://localhost:8000/storage/images';
  LoggedInAdmin: any;

  cartItem:any;
  constructor(public myservice: ServicesService ,private route: ActivatedRoute) {
    this.myservice.cartSubject.subscribe((data)=>{
      this.cartItem = data;
    })
   
    
   }

  ngOnInit(): void {
   
  
    this.listItemstocart()
    this.getTotal()
    this.CartItemFun(this.cartItem)
    if(!this.cartItem ){
      this.cartItem = 0;
    }
    render({
      id:"#myPaypalButtons",
      currency: "EGP",
      value :this.total,
      onApprove:(details)=>{
        if(this.total==0)
        {
          alert('Cart Is Empty')
        }
        else{
          let order = this.productsInCart.map(item=>{
            return {productId:item.id,quantity:item.quanity,totalPrice:item.price*item.quanity}
          })
      
          let finalData=
          {
            
            user_id:localStorage.getItem('UserId'),
          
             order:order,
            finaltotal:this.total
          }
          
            this.myservice.insertOrder(finalData).subscribe(
              (data:any)=>{
                
                //  console.log('hello data  '+data)
                  localStorage.removeItem('cart');
                  window.location.href="/checkout";
                  
              }
             );
    
        }
       
        
      }
      
    })
  }

  listItemstocart()
  {
    if("cart" in localStorage)
    {
      this.productsInCart=JSON.parse(localStorage.getItem("cart")!);
      console.log(this.productsInCart);
    }
  }


  getTotal()
  {
    this.total=0;
    for(let x in this.productsInCart)
    {
      this.total+=this.productsInCart[x].price * this.productsInCart[x].quanity;
    }
  }


  detectChange()
  {
    localStorage.setItem("cart",JSON.stringify(this.productsInCart))
    this.getTotal()
  }

  minus(ind:any)
  {
    this.productsInCart[ind].quanity--;
    if(this.productsInCart[ind].quanity <1)
    {
      this.productsInCart[ind].quanity =1;
    }
    localStorage.setItem("cart",JSON.stringify(this.productsInCart));
    this.CartItemFun(this.cartItem - 1);
    this.getTotal()
   

  }
  plus(ind:any)
  {
    this.productsInCart[ind].quanity++;
    this.getTotal()
    localStorage.setItem("cart",JSON.stringify(this.productsInCart));
    // this.CartItemFun(this.productsInCart[ind].quanity-1);
    this.CartItemFun(this.cartItem - 1);
  }

  deleteItem(index:any)
  {
    this.productsInCart.splice(index,1);
    this.getTotal()
  
    localStorage.setItem("cart",JSON.stringify(this.productsInCart))
    // this.CartItemFun(this.productsInCart[index].quanity-1 );
    this.CartItemFun(this.cartItem - 1);
  }

  clearCart()
  {
    this.productsInCart=[];
    this.getTotal()
    localStorage.setItem("cart",JSON.stringify(this.productsInCart))
    this.cartItem=0;
    this.myservice.cartSubject.next(this.cartItem);
    

  }

  checkOut()
  {
    if(this.total==0)
    {
      alert('Cart Is Empty')
    }
    else{
      let order = this.productsInCart.map(item=>{
        return {productId:item.id,quantity:item.quanity,totalPrice:item.price*item.quanity}
      })
  
      let finalData=
      {
        
        user_id:localStorage.getItem('UserId'),
      
         order:order,
        finaltotal:this.total
      }
      
        this.myservice.insertOrder(finalData).subscribe(
          (data:any)=>{
            
            //  console.log('hello data  '+data)
              localStorage.removeItem('cart');
              window.location.href="/checkout";
              
          }
         );

    }
   
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
