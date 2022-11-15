import { Component, OnInit, TemplateRef } from '@angular/core';
import{FormGroup, FormControl,Validators,FormBuilder} from "@angular/forms";
import { ServicesService } from 'src/app/Components/Admin/Services/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { NgIfContext } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  UserId=0;
  LoggedInAdmin: any;
 
  constructor(private _route:Router , public myService: ServicesService , public fb:FormBuilder, private _myActivate : ActivatedRoute  ) {
    this.UserId= _myActivate.snapshot.params["id"];
  }

  login : FormGroup|any;

  ngOnInit(): void {
    this.login= new FormGroup({
      "email": new FormControl( '',[Validators.required, Validators.email]),
      "password": new FormControl('', [Validators.required, Validators.minLength(7)])
    })
    this.LoggedInAdmin = localStorage.getItem("userType")
    if(this.LoggedInAdmin){
        window.location.href = '/';
        
      }
      if(this.LoggedInAdmin == 'admin'){
        window.location.href ="/admin";
      }
   
  }

  // loginData(login:FormGroup){

  //   //   console.log(this.login.value);//catch data from sign up
  //   // this._http.get<any>("http://127.0.0.1:8000/api/login/").subscribe(
  //   //   res=>{
        
  //   //     const user = res.find((a:any)=>
  //   //     {
  //   //       return a.email === this.login.value.email && a.password === this.login.value.password;
  //   //     });
  //   //     if(user)
  //   //     {
  //   //        //declare user email on login
  //   //        let userEmail= this.login.value.email;
  //   //       alert('you are successfully login' + userEmail);
  //   //       sessionStorage.setItem("userEmail",userEmail) // key of unique user email
  //   //       console.log(userEmail);
  //   //       this._route.navigate(['']);//rout home page ??????????????????????
  //   //       this.login.reset();
  //   //     }

  //   //     else if(this.login.value.email == "admin@gmail.com" && this.login.value.password == "12345678")
  //   //     {
  //   //       sessionStorage.setItem("Admin", 'admin' );
  //   //       alert('you are successfully login as Admin');
  //   //       this._route.navigate(['AddProducts']);
  //   //       this.login.reset();
  //   //     }
  //   //     else{
  //   //       alert('user not found');
  //   //       this._route.navigate(['signup']);
  //   //     }
  //   //   }

  //   // )


  //     }

  UserForm = new FormGroup ({
    "email": new FormControl('',/*[Validators.email, Validators.required]*/),
    "password": new FormControl('', /*[Validators.minLength(7),Validators.maxLength(20),Validators.required]*/),
  })
  
  loginData(){

       
        if(this.UserForm.valid){

        //   if( this.login.value.email == 'admin@gmail.com' && this.login.value.password=='123456789'){
        //     localStorage.setItem('admin',this.login.value.email);
        //     alert('you are successfully login as admin');
        //     window.location.href = "/admin";
        // }
            

          this.myService.userLogin(this.login.value).subscribe(
            {
              next(data){
              console.log(data);
              console.log(data['userType']); // fetch id of user  
                
                if(data['userType']== "admin")
                {
                  localStorage.setItem('token', data['token'] );
                  localStorage.setItem('adminId', data['data']['id']);
                  localStorage.setItem('userType', data['userType']);
                  alert('you are successfully login as Admin');
                  window.location.href = "/admin";
                  this.login.reset();
                } 
                else{
                  localStorage.setItem('token', data['token']);
                  localStorage.setItem('UserId', data['data']['id']);
                  localStorage.setItem('userType', data['userType']);
                  localStorage.setItem('name', data['data']['name']);
                  alert('you are successfully login ' + data['data']['name']);
                  window.location.href = "/";
                  this.login.reset();
                }
            },
            error(err)
            {
              alert("user not found !! ");
              console.log(err);
              window.location.href = "/signup "  ; 
            }
          }
    
          )
            
        }
      }
 

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


