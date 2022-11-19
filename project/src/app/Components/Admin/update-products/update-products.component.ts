import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../Services/services.service';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  imgsrc= 'http://localhost:8000/storage/images';
  form: FormGroup;
  // SKU:any;title:any;image:any;price:any;details:any;
  myimage:any;
  categories: any;
  constructor(public fb: FormBuilder, private myService:ServicesService,private route:ActivatedRoute) 
  {
         this.form = this.fb.group({
          title: ['',[Validators.required]],
          SKU: null,
          image:null,
          price: [0,[Validators.required]],
          details: ['',[Validators.required]],
          discount:null,
          cat_id:null
      })

    // this.myService.getByIdedit(this.route.snapshot.params['id']).subscribe((data:any)=>{
    //   this.myimage =data['image'];
    //   // this.form = this.fb.group({
    //     this.title= data['title'],
    //     this.SKU= data['SKU'],
    //     // slug: new FormControl(data['slug']),
    //     this.image=data['image'],
    //    this.price= data['price'],
    //     this.details=data['details']
    //   // })
    // });

   

   }

  // UpdateProductForm = new FormGroup({
  //   title: new FormControl(""),
  //   SKU: new FormControl(""),
  //   slug: new FormControl(""),
  //   image:new FormControl(""),
  //   price: new FormControl(""),
  //   details: new FormControl("")
  // })

  ngOnInit(): void {
    console.log(this.route.snapshot);

    this.myService.getByIdedit(this.route.snapshot.params['id']).subscribe(
      (data:any)=>{
            this.myimage =data['image'];

            this.form = new FormGroup
            ({
                title:new FormControl( data['title']),
                SKU: new FormControl(data['SKU']),
                 image:new FormControl(data['image']),
                price:new FormControl( data['price']),
                discount:new FormControl( data['discount']),
                details:new FormControl(data['details']),
                cat_id:new FormControl(data['cat_id'])
            })
    });
    this.myService.getAllCategories().subscribe(data=>{
      this.categories = data;
      console.log(data);

  })
}
  get titlevalidation(){
    // return this.signup.value.name.validdata['image']
    return this.form.value.title
  }
  get pricevalidation(){
    // return this.signup.value.name.validdata['image']
    return this.form.value.price
  }
  get detailsvalidation(){
    // return this.signup.value.name.validdata['image']
    return this.form.value.details
  }
  

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      image: file
    });
  }

  Updatepro(){

    const formData: any = new FormData();
    formData.append('image', this.form.controls['image'].value);
    formData.append('title', this.form.controls['title'].value);
    formData.append('SKU', this.form.controls['SKU'].value);
    formData.append('details', this.form.controls['details'].value);
    formData.append('price', this.form.controls['price'].value);
    formData.append('discount', this.form.controls['discount'].value);
    formData.append('cat_id', this.form.controls['cat_id'].value);
    formData.append('_METHOD', 'PUT');

    console.log(formData);
    this.myService.UpdateProd(formData,this.route.snapshot.params['id']).subscribe
    ((data)=>{
      console.log(data);
      alert('product updated successfully');
       window.location.href="/admin";

    })
  }







}
