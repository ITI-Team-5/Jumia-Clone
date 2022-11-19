import { Component, OnInit, TemplateRef } from '@angular/core';
import{FormGroup, FormControl,Validators,FormBuilder} from "@angular/forms";
import { ServicesService } from 'src/app/Components/Admin/Services/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { NgIfContext } from '@angular/common';

import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  UserId=0;
  LoggedInAdmin: any;

  // //fb
  user: SocialUser;
  loggedIn: boolean;
 
  constructor(private router:Router , public myService: ServicesService ,
     public fb:FormBuilder, private _myActivate : ActivatedRoute,
      private socialAuthService: SocialAuthService  
     )
     
  {
    this.UserId= _myActivate.snapshot.params["id"];
  }

  login : FormGroup|any;

  ngOnInit(): void {
    // this.socialAuthService.signOut()
    // FB
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.myService.googleSignup(this.user).subscribe(
        {
          next(data){
          console.log(data);
          localStorage.setItem('token',data['token']);  
          localStorage.setItem('name', data['name']);
          localStorage.setItem('role','user');
          localStorage.setItem('UserId', data['UserId']);
           window.location.href= "/"
      }
    });
     
     
    });

    this.login= new FormGroup({
      "email": new FormControl( '',[Validators.required, Validators.email]),
      "password": new FormControl('', [Validators.required])
    })
    if(localStorage.getItem('token')){
      this.router.navigate(['/']);
    }
   
  }

  // google &FB
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.router.navigate(['/']);
  }


  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log("my dear user "+this.user)
  }



  UserForm = new FormGroup ({
    "email": new FormControl('',/*[Validators.email, Validators.required]*/),
    "password": new FormControl('', /*[Validators.minLength(7),Validators.maxLength(20),Validators.required]*/),
  })
  
  loginData(){      

      if(this.UserForm.valid){
         this.myService.userLogin(this.login.value).subscribe(
            {
              next(data){
              console.log(data);
              localStorage.setItem('token',data['token']);  
              localStorage.setItem('name', data['name']);
              localStorage.setItem('role', data['role']);
              localStorage.setItem('UserId', data['UserId']);

                window.location.href= "/"
          }, error(err){
            console.log(err);
            alert('email or password are wrong!!!');
 
 }
        });
            }
          };
      get emailControl(): FormControl {
        return this.login.get('email') as FormControl;
      };
      get passwordControl(): FormControl {
        return this.login.get('password') as FormControl;
      }
      get emailValid(){
        return this.login.controls.email.valid;
      }
      get passValid(){
        return this.login.controls.password.valid;
      }
    }


