import { Component, OnInit } from '@angular/core';
import{FormGroup, FormControl,Validators, FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/Components/Admin/Services/services.service';
import { data } from 'jquery';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup:FormGroup|any;
  LoggedInAdmin: any;

  constructor(
              public fb:FormBuilder , private _route:Router ,
              public myService: ServicesService 
            )
      {
          this.signup = this.fb.group({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            phone: '',
            address: '',
            gender: ''
          })
      }

  // signupUser:any;

  ngOnInit(): void {
    this.LoggedInAdmin = localStorage.getItem("UserId")
    if(this.LoggedInAdmin){
        window.location.href = '/admin';
    
    }
   
  }
 
  AddUserForm = new FormGroup ({
    "name": new FormControl('',/* [Validators.required, Validators.minLength(3)]*/), 
    "email": new FormControl('',/*[Validators.email, Validators.required]*/),
    "password": new FormControl('',/* [Validators.min(7),Validators.max(20),Validators.required]*/),
    "password_confirmation": new FormControl('',/*Validators.required*/),
    "phone": new FormControl('',/*Validators.required*/),
    "address": new FormControl('',/*Validators.required*/),
    "gender": new FormControl()
  });

  // addUser(){
  //   console.log(this.AddUserForm);
  //   if(this.AddUserForm.valid){
  //     this.myService.addUser(this.signup.value).subscribe(
  //       res=>{
  //         console.log(res);
  //        alert("you are successfully register ... ");
  //        window.location.href = "/login"  ;
         
  //       },
  //       err=>{
  //         alert("something went wrong .!!");
  //         console.log(err);
  //       }

  //     );
        
  //   }
  //   else{
  //       alert('something went wrong');
  //   }

  // }

  addUser(){
    console.log(this.signup);
    // if(this.AddUserForm.valid){
      this.myService.addUser(this.signup.value).subscribe(
       {
        next(data){
          console.log(data);
           alert("you are successfully register ... ");
           window.location.href = "/login"  ; 
        },
        error(err){
          console.log(err);
          alert('something went wrong !!!');
        }
       }

      )
  }
  get ValidName(){
    // return this.signup.value.name.validdata['image']
    return this.AddUserForm.controls.name.valid
  }
  get ValidEmail(){
    return this.AddUserForm.controls.email.valid
  }
  get ValidPassword(){
    return this.AddUserForm.controls.password.valid
  }
  get ValidConfirmPass(){
    return this.AddUserForm.controls.password_confirmation.valid
  }


}
