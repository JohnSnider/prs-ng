import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product = new Product()
  productId: number = 0

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
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

}
