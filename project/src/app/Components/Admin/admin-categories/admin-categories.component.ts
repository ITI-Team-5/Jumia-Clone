import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../Services/services.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
categ:any;
categories:any;
  constructor(private myService:ServicesService, private acitvatedroute:ActivatedRoute) { 
this.categ = this.acitvatedroute.snapshot.params['name'];
  }

  ngOnInit(): void {
  
    this.getcategories();
  }
  getcategories(){
    this.myService.getAllCategories().subscribe(data=>{
      this.categories = data;
       console.log(data);
    })
  }
  
}
