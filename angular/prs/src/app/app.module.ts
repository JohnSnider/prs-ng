import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VendorListComponent } from './features/vendor-list/vendor-list.component';
import { FormsModule } from '@angular/forms';
import { UserDetailComponent } from './features/user-detail/user-detail.component';
import { VendorDetailComponent } from './features/vendor-detail/vendor-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    UserListComponent,
    VendorListComponent,
    UserDetailComponent,
    VendorDetailComponent
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
