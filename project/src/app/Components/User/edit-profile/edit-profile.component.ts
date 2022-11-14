import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../Admin/Services/services.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  UpdateProfileForm: FormGroup;
  constructor(public fb:FormBuilder,private myactivated:ActivatedRoute,private myservice:ServicesService,private route:Router) { 
    this.UpdateProfileForm = this.fb.group({
      name: ["",Validators.required],
     email: ['',[Validators.email, Validators.required]], 
      phone: ['',[Validators.min(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),Validators.required]],
     address: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(10)]]
 })
  }

  ngOnInit(): void {
    this.myservice.getProfileEdit(this.myactivated.snapshot.params['id']).subscribe(
      (data:any)=>{
        console.log(data);
            this.UpdateProfileForm = new FormGroup
            ({
                name:new FormControl(data['name']),
                email: new FormControl(data['email']),
                 phone:new FormControl(data['phone']),
                address:new FormControl( data['address']),
                password:new FormControl(data['password'])
            })
    });
  }
  get namevalidation(){
    // return this.signup.value.name.validdata['image']
    return this.UpdateProfileForm.value.name
  }
  get emailvalidation(){
    // return this.signup.value.name.validdata['image']
    return this.UpdateProfileForm.value.email
  }
  get passwordvalidation(){
    // return this.signup.value.name.validdata['image']
    return this.UpdateProfileForm.value.password
  }
  get phonevalidation(){
    // return this.signup.value.name.validdata['image']
    return this.UpdateProfileForm.value.phone
  }
  get addressvalidation(){
    // return this.signup.value.name.validdata['image']
    return this.UpdateProfileForm.value.address
  }
  UpdateProfile(){
    const formData: any = new FormData();
    formData.append('name', this.UpdateProfileForm.controls['name'].value);
    formData.append('email', this.UpdateProfileForm.controls['email'].value);
    formData.append('phone', this.UpdateProfileForm.controls['phone'].value);
    formData.append('address', this.UpdateProfileForm.controls['address'].value);
    formData.append('password', this.UpdateProfileForm.controls['password'].value);
    formData.append('_METHOD', 'PUT');
    console.log(formData);
    this.myservice.UpdateProfile(formData,this.myactivated.snapshot.params['id']).subscribe
    ((data)=>{
      console.log(data);
      alert('product updated successfully');
      window.location.href="/profiles";
    })
  }
}
