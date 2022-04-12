import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/models/line-item.model';
import { Request } from 'src/app/models/request.model';
import { LineItemService } from 'src/app/Services/line-item.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {

  request: Request = new Request()
  requestId: number = 0
  lineItems: LineItem[] = []



  constructor(private requestService: RequestService, private router: Router, private lineItemService: LineItemService, private route: ActivatedRoute) { }

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
  rejectRequest() {
    this.requestService.setStatusRejected(this.request).subscribe(
      (data) => {
        this.router.navigateByUrl('/request/list')
      },
      (error) => console.log(error)
    )
  }
  approveRequest() {
    this.requestService.setStatusApproved(this.request).subscribe(
      (data) => {
        this.router.navigateByUrl('/request/list')
      },
      (error) => console.log(error)
    )
  }


}
