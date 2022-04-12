import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/models/request.model';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  request: Request = new Request()
  requestId: number = 0

  constructor(private requestService: RequestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.requestId = params.id
        this.requestService.getById(this.requestId).subscribe(
          data => {
            if (data.length > 0) {
              this.request = data[0]
            }
            console.log(data)

          },
          error => { console.log(error) }


        )
      }
    )

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
