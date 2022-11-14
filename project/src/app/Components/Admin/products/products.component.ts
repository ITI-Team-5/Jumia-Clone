import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../Services/services.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { data } from 'jquery';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  LoggedInAdmin: any;

  constructor(private myService: ServicesService, private _route:Router ) { }
  products:any
  title:any
  imgsrc:any
  page:number = 1;
  total:number = 0;
  ngOnInit(): void {
    this.LoggedInAdmin = localStorage.getItem("userType")
    if(this.LoggedInAdmin != 'admin'){
        window.location.href = '/';
    
    }
    
    // if(localStorage.getItem("user")){
    //   // alert("welcome "+sessionStorage.getItem("userEmail"));
    // }
    // else{
    //   window.location.href = "/";
    // }
    this.getProducts();
    // if(sessionStorage.getItem("Admin")){
    //   // alert("welcome "+sessionStorage.getItem("Admin"));
    // }
    // else{
    //   alert("you are not an Authorized");
    //   this._route.navigate(['']);

    // }

    // let that = this;
    // this.myService.getAllProducts().subscribe(
    //   {
    //     next(data){
    //       that.products = data;
    //     },
    //     error(err){
    //       console.log(err);
    //     }
    //   }
    // )

 
  }
  getProducts(){
  this.myService.getAllProducts(this.page).subscribe((response:any)=>{
    this.products = response.data;
    this.imgsrc= 'http://localhost:8000/storage/images';
    this.total = response.total;
  })
  }
  pageChangeEvent(event: number){
    this.page = event;
    this.getProducts();
}
  DeleteProd(prod_id:any){
    console.log(prod_id);
    let obj = this.products.find(item=>item.id == prod_id).title
    if(confirm('Are u sure u wanna delete ' + obj)){
    this.myService.Deleteprod(prod_id).subscribe((data)=>{
      console.log(data);
      window.location.href = "/admin";
      
    })
  }
  }
  

  search(){
    if(this.title !=""){
      this.products = this.products.filter((res:any)=>{
        return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase())
      })
  }else{
    this.ngOnInit()
  }
    console.log(this.title.toLocaleLowerCase())
  }

}
