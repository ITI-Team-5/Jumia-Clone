
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Admin/header/header.component';
import { ProductsComponent } from './Components/Admin/products/products.component';
import { AddProductsComponent } from './Components/Admin/add-products/add-products.component';
import { ErrorComponent } from './Components/Admin/error/error.component';
import { ServicesService } from './Components/Admin/Services/services.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductsComponent } from './Components/Admin/update-products/update-products.component';

// import { CarouselModule } from 'ngx-owl-carousel-o';
import { QuillModule } from 'ngx-quill';
import { HomeComponent } from './Components/User/home/home.component';
import { CartComponent } from './Components/User/cart/cart.component';
import { ProductDetailsComponent } from './Components/User/product-details/product-details.component';
import { NavComponent } from './Components/User/nav/nav.component';
import { ProductItemComponent } from './Components/User/product-item/product-item.component';
import { LoginComponent } from './userComponents/login/login.component';
import { SignupComponent } from './userComponents/signup/signup.component';
import { UsersService } from './services/users.service';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { OrdersComponent } from './Components/Admin/orders/orders.component';
import { OrderProductComponent } from './Components/Admin/order-product/order-product.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { EditProfileComponent } from './Components/User/edit-profile/edit-profile.component';
import { CheckoutComponent } from './Components/User/checkout/checkout.component';
import { AboutComponent } from './Components/User/about/about.component';
import { ContactComponent } from './Components/User/contact/contact.component';
import { FooterComponent } from './Components/User/footer/footer.component';
import { SortPipe } from './Components/User/pipes/sort.pipe';

import { OffersComponent } from './Components/User/offers/offers.component';
import { PolicyComponent } from './Components/User/policy/policy.component';
import { DiscountSliderComponent } from './Components/User/discount-slider/discount-slider.component';
import { LatestComponent } from './Components/User/latest/latest.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { DiscountsComponent } from './Components/User/discounts/discounts.component';
import { CategoriesComponent } from './Components/User/categories/categories.component';
import { CategoriesDetailsComponent } from './Components/User/categories-details/categories-details.component';
import { SearchProductComponent } from './Components/User/search-product/search-product.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CategoryDetailComponent } from './Components/Admin/category-detail/category-detail.component';
import { AdminCategoriesComponent } from './Components/Admin/admin-categories/admin-categories.component';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    AddProductsComponent,
    ErrorComponent,
    UpdateProductsComponent,
    HomeComponent,
    CartComponent,
    ProductDetailsComponent,
    NavComponent,
    ProductItemComponent,
    LoginComponent,
    SignupComponent,
    OrdersComponent,
    OrderProductComponent,
    ProfileComponent,
    EditProfileComponent,
    CheckoutComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    SortPipe,
    OffersComponent,
    PolicyComponent,
    
    DiscountSliderComponent,
    LatestComponent,
  
    DiscountsComponent,

        CategoriesComponent,
        CategoriesDetailsComponent,
        SearchProductComponent,
        CategoryDetailComponent,
        AdminCategoriesComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CarouselModule,
    QuillModule.forRoot(),
    SocialLoginModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
    
  
  ],
  providers: [
    ServicesService,
    UsersService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '700689474666-g6c9rtoqgm6mtu9dpgkjfpcc3jahnm0b.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('542086661069401')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
