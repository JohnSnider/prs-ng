import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/models/line-item.model';
import { Product } from 'src/app/models/product.model';
import { Request } from 'src/app/models/request.model';
import { LineItemService } from 'src/app/Services/line-item.service';
import { ProductService } from 'src/app/Services/product.service';


@Component({
  selector: 'app-line-item-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {

  lineItem: LineItem = new LineItem()
  requestId: number = 0
  lineItems: LineItem[] = []
  products: Product[] = []
  lineItemId: number = 0

  constructor(private lineItemService: LineItemService, private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {

    this.productService.getAll().subscribe(data => {
      console.log(data)
      this.products = data
    },
      error => { console.log(error) }
    )

    this.route.params.subscribe(
      params => {
        this.lineItemId = params.id
        this.lineItemService.getById(this.lineItemId).subscribe(

          data => {
            if (data.length > 0) {
              this.lineItem = data[0]
              this.requestId = this.lineItem.request.id
            }
            console.log(data)

          },
          error => { console.log(error) }


        )
      }
    )
  }
  editLineItem() {
    this.lineItemService.updateLineItem(this.lineItem).subscribe(
      data => {
        this.router.navigateByUrl('/request/lines/')
      },
      error => console.log(error)


    )
  }
  compareFn(product1: Product, product2: Product) {
    return product1.id === product2.id;
  }
}
