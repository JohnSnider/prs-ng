import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SystemService } from 'src/app/Services/system.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-authenticate',
  templateUrl: './user-authenticate.component.html',
  styleUrls: ['./user-authenticate.component.css']
})
export class UserAuthenticateComponent implements OnInit {


user: User = new User()

  constructor(private userService: UserService, private systemService: SystemService) { }

  ngOnInit(): void {
  }

  login(){
    this.userService.authenticate(this.user).subscribe(
    data => {
      if (data.length > 0) {
        this.systemService.loggedInUser = data[0]

      } else {

      }
    },
    error => console.log(error)


    )
  }

}
