import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './Components/Admin/add-products/add-products.component';
import { ErrorComponent } from './Components/Admin/error/error.component';
import { ProductsComponent } from './Components/Admin/products/products.component';
import { UpdateProductsComponent } from './Components/Admin/update-products/update-products.component';
import { LoginComponent } from './userComponents/login/login.component';
import { SignupComponent } from './userComponents/signup/signup.component';
import { CartComponent } from './Components/User/cart/cart.component';
import { HomeComponent } from './Components/User/home/home.component';
import { ProductDetailsComponent } from './Components/User/product-details/product-details.component';
import { OrdersComponent } from './Components/Admin/orders/orders.component';
import { OrderProductComponent } from './Components/Admin/order-product/order-product.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { EditProfileComponent } from './Components/User/edit-profile/edit-profile.component';
import { CheckoutComponent } from './Components/User/checkout/checkout.component';
import { AboutComponent } from './Components/User/about/about.component';
import { ContactComponent } from './Components/User/contact/contact.component';
import { PrivacyComponent } from './Components/User/privacy/privacy.component';
import { PolicyComponent } from './Components/User/policy/policy.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"policy",
    component:PolicyComponent
  },
  {
    path:"cart",
    component:CartComponent
  },
  {
    path:"product/:id",
    component:ProductDetailsComponent
  },
  {
    path:"admin",
    component:ProductsComponent
  },
  {
    path:"Products",
    component:ProductsComponent
  },
  {
    path:"AddProducts",
    component:AddProductsComponent
  },
  {
    path:"products/edit/:id",
    component:UpdateProductsComponent
  },
  {
    path: "login",
    component:LoginComponent
  },
  {
    path: "signup",
     component:SignupComponent
    },
  {
    path: "orders",
     component:OrdersComponent
    },
  {
    path: "orders/:id",
     component:OrderProductComponent
    },
    {
      path:"profiles",
      component:ProfileComponent
    },
    {
      path:"checkout",
      component:CheckoutComponent
    },
    {
      path:"about",
      component:AboutComponent
    },
    {
      path:"contact",
      component:ContactComponent
    },
    {
      path:"profiles/edit/:id",
      component:EditProfileComponent
    },
   
  {
    path:"**",
    component:ErrorComponent
  },
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
