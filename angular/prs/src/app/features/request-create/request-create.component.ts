import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from 'src/app/models/request.model';
import { RequestService } from 'src/app/Services/request.service';
import { SystemService } from 'src/app/Services/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  request: Request = new Request()

  constructor(private systemService: SystemService, private requestService: RequestService, private router: Router) { }

  ngOnInit(): void {
    if (this.systemService.loggedInUser != undefined)
    this.request.user = this.systemService.loggedInUser
  }
  createRequest(){
    console.log(this.request)
    this.requestService.createRequest(this.request).subscribe(
      data => {
        console.log(data)
        this.router.navigateByUrl('/request/list')
      },
      error => console.log(error)
    )
  }
}
