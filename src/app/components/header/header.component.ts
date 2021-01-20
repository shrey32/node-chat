import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { LoggedInUserService } from './../../services/logged-in-user.service';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {

  public loggedInUser: User = <User>{};

  constructor(public loggedInUserService: LoggedInUserService) {

  }

  ngOnInit(): void {
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
  }

}
