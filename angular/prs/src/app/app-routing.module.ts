import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { ProductCreateComponent } from './features/product-create/product-create.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { RequestCreateComponent } from './features/request-create/request-create.component';
import { RequestDetailComponent } from './features/request-detail/request-detail.component'
import { RequestListComponent } from './features/request-list/request-list.component';
import { UserAuthenticateComponent } from './features/user-authenticate/user-authenticate.component';
import { UserCreateComponent } from './features/user-create/user-create.component';
import { UserDetailComponent } from './features/user-detail/user-detail.component';
import { UserEditComponent } from './features/user-edit/user-edit.component';
import { UserListComponent } from './features/user-list/user-list.component';
import { VendorCreateComponent } from './features/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './features/vendor-detail/vendor-detail.component';
import { VendorListComponent } from './features/vendor-list/vendor-list.component';
import { RequestLinesComponent } from './features/request-lines/request-lines.component';
import { LineItemCreateComponent } from './features/line-item-create/line-item-create.component';
import { VendorEditComponent } from './features/vendor-edit/vendor-edit.component';
import { ProductEditComponent } from './features/product-edit/product-edit.component';
import { RequestEditComponent } from './features/request-edit/request-edit.component';
import { LineItemEditComponent } from './features/line-item-edit/line-item-edit.component';
import { RequestReviewComponent } from './features/request-review/request-review.component';
import { RequestApproveComponent } from './features/request-approve/request-approve.component';

const routes: Routes = [
  { path: '', component: AboutComponent },

  { path: 'login', component: UserAuthenticateComponent },

  { path: 'user/list', component: UserListComponent },
  { path: 'user/detail/:id', component: UserDetailComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/edit/:id', component: UserEditComponent },

  { path: 'vendor/list', component: VendorListComponent },
  { path: 'vendor/detail/:id', component: VendorDetailComponent },
  { path: 'vendor/create', component: VendorCreateComponent },
  { path: 'vendor/edit/:id', component: VendorEditComponent },

  { path: 'product/list', component: ProductListComponent },
  { path: 'product/detail/:id', component: ProductDetailComponent },
  { path: 'product/create', component: ProductCreateComponent },
  { path: 'product/edit/:id', component: ProductEditComponent },

  { path: 'request/list', component: RequestListComponent },
  { path: 'request/detail/:id', component: RequestDetailComponent },
  { path: 'request/create', component: RequestCreateComponent },
  { path: 'request/lines/:id', component: RequestLinesComponent },
  { path: 'request/edit/:id', component: RequestEditComponent },
  { path: 'request/review', component: RequestReviewComponent },
  { path: 'request/approve/:id', component: RequestApproveComponent },

  { path: 'lines/create/:id', component: LineItemCreateComponent },
  { path: 'lines/edit/:id', component: LineItemEditComponent },

  { path: '**', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
