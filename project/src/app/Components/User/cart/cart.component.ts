import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../Admin/Services/services.service';

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
  cartNum:any=0;
  constructor(private myservice:ServicesService,private _route:Router) { }

  ngOnInit(): void {
  
    this.LoggedInAdmin = localStorage.getItem("userType")
     if(this.LoggedInAdmin != 'user'){
         window.location.href = '/admin';
     
     }


    this.listItemstocart()
    this.getTotal()
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
    // this.CartItemFun(this.productsInCart[ind].quanity-1);
    this.getTotal()
   

  }
  plus(ind:any)
  {
    this.productsInCart[ind].quanity++;
    this.getTotal()
    localStorage.setItem("cart",JSON.stringify(this.productsInCart));
    // this.CartItemFun(this.productsInCart[ind].quanity-1);
  }

  deleteItem(index:any)
  {
    this.productsInCart.splice(index,1);
    this.getTotal()
  
    localStorage.setItem("cart",JSON.stringify(this.productsInCart))
    // this.CartItemFun(this.productsInCart[index] -1);
  }

  clearCart()
  {
    this.productsInCart=[];
    this.getTotal()
    localStorage.setItem("cart",JSON.stringify(this.productsInCart))
    this.cartNum=0;
    this.myservice.cartSubject.next(this.cartNum);
    

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
        // user_id:sessionStorage.getItem('user_id'),
        user_id:localStorage.getItem('UserId'),
        // date: new Date(),
         order:order,
        finaltotal:this.total
      }
      // localStorage.setItem("checkout",JSON.stringify(finalData));
        // insert into tables
        this.myservice.insertOrder(finalData).subscribe(
          (data:any)=>{
            
            //  console.log('hello data  '+data)
              localStorage.removeItem('cart');
              window.location.href="/checkout";
              
          }
         );

    }
   
  }
  
//   CartItemFun(qty:any){
    
//     var CartValue = JSON.parse(localStorage.getItem('cart')) ;
    
//     this.cartNum = CartValue.length + qty;
//     this.myservice.cartSubject.next(this.cartNum);
//   //  console.log(this.cartNum);
// }
  
}
