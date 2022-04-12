import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/models/line-item.model';
import { Product } from 'src/app/models/product.model';
import { Request } from 'src/app/models/request.model';
import { LineItemService } from 'src/app/Services/line-item.service';
import { ProductService } from 'src/app/Services/product.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})



export class LineItemCreateComponent implements OnInit {

  lineItem: LineItem = new LineItem()
  request: Request = new Request()
  requestId: number = 0
  products: Product[] = []

  constructor(private route: ActivatedRoute, private requestService: RequestService, private productService: ProductService, private router: Router,
    private lineItemService: LineItemService) { }

  ngOnInit(): void {

    this.productService.getAll().subscribe(data => {
      console.log(data)
      this.products = data
    },
      error => { console.log(error) }
    )

    this.route.params.subscribe(
      params => {
        this.requestId = params.id
        this.requestService.getById(this.requestId).subscribe(
          data => {
            if (data.length > 0) {
              this.request = data[0]
              this.lineItem.request = this.request
            }
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }
  createLineItem() {
    console.log(this.lineItem)
    this.lineItemService.createLineItem(this.lineItem).subscribe(
      data => {
        console.log(data)
        this.router.navigateByUrl('/request/lines/' + this.requestId)
      },
      error => console.log(error)
    )
  }
}


