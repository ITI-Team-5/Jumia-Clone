import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Admin/Services/services.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-discount-slider',
  templateUrl: './discount-slider.component.html',
  styleUrls: ['./discount-slider.component.css']
})
export class DiscountSliderComponent implements OnInit {
  constructor(private myserv:ServicesService) { }
  products:any;
  discount:any=[];
  imgsrc:any;
  ngOnInit(): void {
    this.getdata();

  }
  getdata()
  {
    let obj = this.products;
    this.myserv.getAllProducts(this.products).subscribe((response:any)=>{
      this.products = response.data;
      this.imgsrc= 'http://localhost:8000/storage/images';
      for(let j=0;j<this.products.length;j++){
        if(this.products[j].discount){
        this.discount.push(this.products[j])
        console.log(this.discount)
        }
         }
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    autoplayTimeout:1000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

}
