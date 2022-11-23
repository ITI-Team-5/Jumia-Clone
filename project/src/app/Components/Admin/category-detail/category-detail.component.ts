import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../Services/services.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  LoggedInAdmin: any;
  categories: any;
  categ:any  
  constructor(private activatedroute:ActivatedRoute,private myService: ServicesService,private router:Router) { 
  this.categ = this.activatedroute.snapshot.params['name'];
  
}
products:any[]=[];
title:any
imgsrc:any

ngOnInit(): void {
  
    this.getcatId();
  }

  getcatId(){
    this.myService.getCatId(this.categ).subscribe(
      (data)=>{ 
        this.categories = data;
        console.log(data);
      })
  }

 
  DeleteProd(prod_id:any){
    console.log(prod_id);
    this.myService.Deleteprod(prod_id).subscribe((data)=>{
      console.log(data);
      window.location.href = "/admin";
    })
  }

  
}
