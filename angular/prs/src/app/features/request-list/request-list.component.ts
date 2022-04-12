import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from 'src/app/models/request.model';
import { User } from 'src/app/models/user.model';
import { RequestService } from 'src/app/Services/request.service';
import { SystemService } from 'src/app/Services/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  requests: Request[] = [];
  request: Request = new Request();
  loggedInUser: User = new User();
  requestId: number = 0;

  constructor(private requestService: RequestService, private systemService: SystemService, private router: Router) { }

  ngOnInit(): void {


    const loggedInUser = this.systemService.loggedInUser
    if (loggedInUser && loggedInUser.admin) {
      this.requestService.getAll().subscribe(
        data => {
          this.requests = data
          console.log(data)
        },
        error => console.log(error)

      )
    } else if (loggedInUser && !loggedInUser.admin) {
      this.requestService.getAllByUser(loggedInUser).subscribe(
        data => {
          this.requests = data
          console.log(data)
        },
        error => console.log(error)
      )
    }
  }
  deleteRequest() {
    this.requestService.deleteById(this.request.id).subscribe(
      data => {
        this.router.navigateByUrl("/request/list")
      },
      error => console.log(error)
    )
  }

}
