import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:any;
  constructor(private myservice:ServicesService,private route:Router) { }

  ngOnInit(): void {
    let that = this;
    this.myservice.getAllCategories().subscribe((data:any)=>{
      that.categories = data;
      console.log(data);
      
    })
  }

}
