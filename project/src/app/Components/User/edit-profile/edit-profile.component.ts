import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
      name: "",
     email: "", 
      phone: "",
     address: "",
      password: ""
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
      window.location.href="/profiles";
    })
  }
}
