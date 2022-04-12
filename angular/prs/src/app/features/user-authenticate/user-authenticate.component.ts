import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private systemService: SystemService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.userService.authenticate(this.user).subscribe(
    data => {
      if (data.length > 0) {
        this.systemService.loggedInUser = data[0]
        this.router.navigateByUrl('/user/list')

      } else {

      }
    },
    error => console.log(error)


    )
  }

}
