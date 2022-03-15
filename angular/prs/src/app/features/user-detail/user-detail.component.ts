import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User = new User()
  userId: number = 1

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getById(this.userId).subscribe(
      data => {
        if(data.length > 0) {
          this.user = data[0]
        }
        console.log(data)

      },
      error => {console.log(error)}


    )
  }

}
