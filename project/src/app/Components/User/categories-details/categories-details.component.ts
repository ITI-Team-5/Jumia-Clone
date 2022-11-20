import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.css']
})
export class CategoriesDetailsComponent implements OnInit {
  singlecat:any;
  id:any;
  constructor(private myserv:ServicesService ,private myactivrout:ActivatedRoute) {

   var Cat_id =  this.myactivrout.snapshot.params['id'];
   this.myserv.getCatId(Cat_id).subscribe(
    (data)=>{ 
      this.singlecat = data;
      console.log(data);
    })
  }

  ngOnInit(): void {
    

  }

}
