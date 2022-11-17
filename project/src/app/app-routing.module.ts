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
import { UserGuard } from './Components/Admin/user.guard';
import { AdminGuard } from './Components/Admin/admin.guard';
import { DiscountsComponent } from './Components/User/discounts/discounts.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    canActivate:[UserGuard]
  },
  {
    path:"cart",
    component:CartComponent,
    canActivate:[UserGuard]
  },
  {
    path:"product/:id",
    component:ProductDetailsComponent,
    canActivate:[UserGuard]
  },
  {
    path:"admin",
    component:ProductsComponent,
    canActivate:[AdminGuard]
  },
  {
    path:"Products",
    component:ProductsComponent,
    canActivate:[UserGuard]
  },
  {
    path:"products/discounts",
    component:DiscountsComponent,
    canActivate:[UserGuard]
  },
  {
    path:"AddProducts",
    component:AddProductsComponent,
    canActivate:[AdminGuard]
  },
  {
    path:"products/edit/:id",
    component:UpdateProductsComponent,
    canActivate:[AdminGuard]
  },
  {
    path: "login",
    component:LoginComponent,
  },
  {
    path: "signup",
     component:SignupComponent,
    },
  {
    path: "orders",
     component:OrdersComponent,
     canActivate:[AdminGuard]
    },
  {
    path: "orders/:id",
     component:OrderProductComponent,
     canActivate:[AdminGuard]
    },
    {
      path:"profiles",
      component:ProfileComponent,
      canActivate:[UserGuard]
    },
    {
      path:"checkout",
      component:CheckoutComponent,
      canActivate:[UserGuard]
    },
    {
      path:"about",
      component:AboutComponent,
      canActivate:[UserGuard]
    },
    {
      path:"contact",
      component:ContactComponent,
      canActivate:[UserGuard]
    },
    {
      path:"profiles/edit/:id",
      component:EditProfileComponent,
      canActivate:[UserGuard]
    },
  {
    path:"**",
    component:ErrorComponent
  },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
