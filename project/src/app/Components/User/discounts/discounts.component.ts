import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {
  products:any;
  imgsrc:any;
  constructor(private myservice:ServicesService,private route:Router,private activeRoute:ActivatedRoute) { }


  ngOnInit(): void {
    let that = this;
    this.myservice.getDiscounts().subscribe((data:any)=>{
      that.products = data;
      this.imgsrc= 'http://localhost:8000/storage/images';
      console.log(data);
    })
  }

  // getDiscountItems(){
  //   this.myservice.getDiscounts().subscribe({
  //     next(data:any){
  //       this.products = data;
  //       //console.log(this.products[0].title)
  //        console.log(data);
  //     }
  //   })
  // }

}