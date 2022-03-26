import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./core/menu/menu.component";
import { AboutComponent } from "./features/about/about.component";
import { UserDetailComponent } from "./features/user-detail/user-detail.component";
import { UserListComponent } from "./features/user-list/user-list.component";
import { VendorDetailComponent } from "./features/vendor-detail/vendor-detail.component";
import { VendorListComponent } from "./features/vendor-list/vendor-list.component";
import { ProductListComponent } from './features/product-list/product-list.component';
import { UserCreateComponent } from './features/user-create/user-create.component';
import { ProductDetailComponent } from "./features/product-detail/product-detail.component";
import { VendorCreateComponent } from "./features/vendor-create/vendor-create.component";
import { ProductCreateComponent } from './features/product-create/product-create.component';
import { UserEditComponent } from './features/user-edit/user-edit.component';
import { UserAuthenticateComponent } from './features/user-authenticate/user-authenticate.component';







@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    UserListComponent,
    VendorListComponent,
    UserDetailComponent,
    VendorDetailComponent,
    MenuComponent,
    ProductListComponent,
    UserCreateComponent,
    ProductDetailComponent,
    VendorCreateComponent,
    ProductCreateComponent,
    UserEditComponent,
    UserAuthenticateComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
