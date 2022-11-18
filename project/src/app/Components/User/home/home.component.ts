import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  LoggedInAdmin: any;

  constructor(private myservice:ServicesService) { }
  navItem:any;
  SortbyParam = '';
  SortDirection = 'asc'; 
  products:any[]=[];
 productsInCart:any[]=[]
 page:number = 1;
  total:number = 0;
 title:any;

 users:any[]=[];

 

  ngOnInit(): void {
     this.getdata();
     this.LoggedInAdmin = localStorage.getItem("UserId")

   }

  getdata()
  {
    this.myservice.getAllProducts(this.page).subscribe((response:any)=>{
      this.products = response.data;
      this.total = response.total;
    })
  }
  pageChangeEvent(event: number){
    this.page = event;
    this.getdata();
}

  addtocart(event:any){

    if("cart" in localStorage)
    {
      this.productsInCart=JSON.parse(localStorage.getItem("cart")!); // updated array -- ! to escape null
      let exist = this.productsInCart.find(item => item.id == event.id);
      if(exist){
        alert('Item Already chosen')
      }
      else
      {
        this.productsInCart.push(event);
        localStorage.setItem('cart',JSON.stringify(this.productsInCart) )

      }

    }
    else
    {
      this.productsInCart.push(event);
      localStorage.setItem('cart',JSON.stringify(this.productsInCart) )
    }



  }
  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }


}
