import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/models/line-item.model';

import { Request } from 'src/app/models/request.model';
import { LineItemService } from 'src/app/Services/line-item.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {


  request: Request = new Request()
  requestId: number = 0
  lineItems: LineItem[] = []

  constructor(private requestService: RequestService, private route: ActivatedRoute, private lineItemService: LineItemService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.requestId = params.id
        this.requestService.getById(this.requestId).subscribe(
          data => {
            if (data.length > 0) {
              this.request = data[0]

              this.lineItemService.getAllByRequest(this.request).subscribe(
                data => {
                  this.lineItems = data
                },
                error => console.log(error)
              )
            }
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }
  deleteLineItem(id: number) {
    this.lineItemService.deleteById(id).subscribe(
      data => {
      },
      error => { console.log(error) }
    )
  }

  reviewRequest() {
    if (this.request.total > 50) {
      this.requestService.setStatusReview(this.request).subscribe(
        (data) => {
          this.router.navigateByUrl('/request/list')
        },
        (error) => console.log(error)
      )
    } else {
      this.requestService.setStatusApproved(this.request).subscribe(
        (data) => {
          this.router.navigateByUrl('/request/list')
        },
        (error) => console.log(error)
      )
    }
  }
  reopenRequest() {
    this.requestService.setStatusReopened(this.request).subscribe(
      (data) => {
        this.router.navigateByUrl('/request/list')
      },
      (error) => console.log(error)
    )
  }
  rejectRequest() {
    this.requestService.setStatusRejected(this.request).subscribe(
      (data) => {
        this.router.navigateByUrl('/request/list')
      },
      (error) => console.log(error)
    )
  }
}
