import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {

  constructor(private myserv:ServicesService) { }
  products:any;
  imgsrc:any;
  ngOnInit(): void {
    this.getdata();

  }
  getdata()
  {
    this.myserv.getAllProducts(this.products).subscribe((response:any)=>{
      this.products = response.data.slice(1,8)
      this.imgsrc= 'http://localhost:8000/storage/images';
     
     // console.log(this.products.slice(1,3))
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
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

}
