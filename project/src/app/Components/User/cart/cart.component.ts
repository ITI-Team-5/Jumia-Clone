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

  constructor(private myserv:ServicesService,private _route:Router) { }

  ngOnInit(): void {
    // if(localStorage.getItem("token")){
    //   // alert("welcome "+sessionStorage.getItem("userEmail"));
    // }
    // else{
    //   alert("please logged in ....");
    //   window.location.href = "/login";
    // }
    // this.LoggedInAdmin = localStorage.getItem("userType")
    //  if(this.LoggedInAdmin != 'user'){
    //      window.location.href = '/admin';
     
    //  }


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
    this.getTotal()
    localStorage.setItem("cart",JSON.stringify(this.productsInCart))


  }
  plus(ind:any)
  {
    this.productsInCart[ind].quanity++;
    this.getTotal()
    localStorage.setItem("cart",JSON.stringify(this.productsInCart))


  }

  deleteItem(index:any)
  {
    this.productsInCart.splice(index,1);
    this.getTotal()

    localStorage.setItem("cart",JSON.stringify(this.productsInCart))

  }

  clearCart()
  {
    this.productsInCart=[];
    this.getTotal()
    localStorage.setItem("cart",JSON.stringify(this.productsInCart))

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
        user_id:localStorage.getItem('token'),
        // date: new Date(),
         order:order,
        finaltotal:this.total
      }
      // localStorage.setItem("checkout",JSON.stringify(finalData));
        // insert into tables
        this.myserv.insertOrder(finalData).subscribe(
          (data:any)=>{
            
            //  console.log('hello data  '+data)
              localStorage.removeItem('cart');
              window.location.href="/checkout";
              
          }
         );

    }
   
  }
}
