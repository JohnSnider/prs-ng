import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/models/line-item.model';
import { Request } from 'src/app/models/request.model';
import { User } from 'src/app/models/user.model';
import { LineItemService } from 'src/app/Services/line-item.service';
import { RequestService } from 'src/app/Services/request.service';
import { SystemService } from 'src/app/Services/system.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  loggedInUser: User = new User();
  request: Request = new Request();
  lineItem: LineItem[] = [];
  requests: Request[] = [];




  constructor(private systemService: SystemService, private userService: UserService, private requestService: RequestService, private lineItemService: LineItemService) { }

  ngOnInit(): void {
    if (this.systemService.loggedInUser != undefined) {
      this.loggedInUser = this.systemService.loggedInUser;
    }
    this.requestService.getAllForReview(this.loggedInUser).subscribe(
      (data) => {

        this.requests = data;
        this.lineItemService.getAllByRequest(this.request).subscribe(
          (data) => {
            this.lineItem = data;
          },
          (error) => console.log(error)
        );

      }
    )
  }

}
