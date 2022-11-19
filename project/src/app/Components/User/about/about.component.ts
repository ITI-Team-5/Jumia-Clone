import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  mytest: string;

  constructor(private myservice:ServicesService) { }

  ngOnInit(): void {
  }
  // test()
  // {
  //   this.mytest='hello service from about';
  //   this.myservice.setProduct(this.mytest);
  // }
}
