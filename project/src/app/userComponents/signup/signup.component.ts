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

  visible:boolean = true;
  changetype:boolean = true;
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

  showpassword(){
  this.visible = !this.visible
  this.changetype = !this.changetype
  }
  ngOnInit(): void {
    this.LoggedInAdmin = localStorage.getItem("UserId")
    if(this.LoggedInAdmin){
        window.location.href = '/admin';
    
    }
   
  }
 
  AddUserForm = new FormGroup ({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]), 
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[Validators.min(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),Validators.required]),
    phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    address: new FormControl('',Validators.required),
    accept: new FormControl('',Validators.required)
  });
  get namevalidation(){
    // return this.signup.value.name.validdata['image']
    return this.AddUserForm.controls.name.valid
  }
  get emailvalidation(){
    return this.AddUserForm.controls.email.valid
  }
  get passwordvalidation(){
    return this.AddUserForm.controls.password.valid
  }
  get phonevalidation(){
    return this.AddUserForm.controls.phone.valid
  }
  get addressvalidation(){
    return this.AddUserForm.controls.address.valid
  }
  get acceptvalidation(){
    return this.AddUserForm.controls.accept.valid
  }
  



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
    console.log(this.AddUserForm);
    // if(this.AddUserForm.valid){
      this.myService.addUser(this.AddUserForm.value).subscribe(
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
  // get ValidName(){
  //   // return this.signup.value.name.validdata['image']
  //   return this.AddUserForm.controls.name.valid
  // }
  // get ValidEmail(){
  //   return this.AddUserForm.controls.email.valid
  // }
  // get ValidPassword(){
  //   return this.AddUserForm.controls.password.valid
  // }
  // get ValidConfirmPass(){
  //   return this.AddUserForm.controls.password_confirmation.valid
  // }


  
}
