import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../Services/services.service';
import { Router } from '@angular/router';
import { data } from 'jquery';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  form :FormGroup;
  constructor(public fb:FormBuilder,public myService: ServicesService,private _route:Router)
   {
      this.form = this.fb.group({
      title: ['',[Validators.required]],
      SKU: ['',[Validators.required,Validators.maxLength(10)]],
      image:null,
      price: [0,[Validators.required,Validators.max(15)]],
      details: ['',[Validators.required]],
      discount:null
    })
   }
   get titlevalidation(){
    // return this.signup.value.name.validdata['image']
    return this.form.value.title
  }
  get SKUvalidation(){
    // return this.signup.value.name.validdata['image']
    return this.form.value.SKU
  }
  get pricevalidation(){
    // return this.signup.value.name.validdata['image']
    return this.form.value.price
  }
  get detailsvalidation(){
    // return this.signup.value.name.validdata['image']
    return this.form.value.details
  }
  

   
  ngOnInit(): void {
  //  let authAdmin :any;
  //  authAdmin = localStorage.getItem('userType');
  //  console.log(authAdmin);
  //   if(authAdmin == 'admin'){
  //   // alert("welcome admin");
  //   }
  //   else{
  //     alert("you are not an Authorized");
  //     window.location.href = "/";

  //   }
  }
 

uploadFile(event:Event){
  const file = (event.target as HTMLInputElement)?.files?.[0];
  this.form.patchValue({
    image:file
  });
}


submitForm()
{
  const formData :any= new FormData();
     formData.append('image', this.form.controls['image'].value);
     formData.append('title', this.form.controls['title'].value);
     formData.append('SKU', this.form.controls['SKU'].value);
     formData.append('details', this.form.controls['details'].value);
     formData.append('price', this.form.controls['price'].value);
     formData.append('discount', this.form.controls['discount'].value);
    //  formData.append('_METHOD', 'POST');
     console.log(formData);

     this.myService.AddProd(formData).subscribe(
      (data:any)=>{
        window.location.href="/admin";
        alert('product added successfully');
      }
     );

      // window.location.href="/admin";

}





}