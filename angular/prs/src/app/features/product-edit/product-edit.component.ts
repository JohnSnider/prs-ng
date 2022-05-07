import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Vendor } from 'src/app/models/vendor.model';
import { ProductService } from 'src/app/Services/product.service';
import { VendorService } from 'src/app/Services/vendor.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product = new Product()
  productId: number = 0
  vendorId: number = 0
  vendors: Vendor[] = []

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private vendorService: VendorService) { }

  ngOnInit(): void {

    this.vendorService.getAll().subscribe(data => {
      console.log(data)
      this.vendors = data
    },
      error => { console.log(error) }
    )

    //This is getting the product, working code
    this.route.params.subscribe(
      params => {
        this.productId = params.id
        this.productService.getById(this.productId).subscribe(
          data => {
            if (data.length > 0) {
              this.product = data[0]

            }
            console.log(data)

          },
          error => { console.log(error) }


        )
      }
    )
  }

  editProduct() {
    this.productService.updateProduct(this.product).subscribe(
      data => {
        this.router.navigateByUrl('product/detail/' + this.product.id)
      },
      error => console.log(error)


    )
  }
  compareFn(vendor1: Vendor, vendor2: Vendor) {
    return vendor1.id === vendor2.id

  }


}
