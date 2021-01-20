import { User } from './../models/user';
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  private loggedInUser: User = <User>{};

  constructor() {
    this.setLoggedInUser();
  }

  private setLoggedInUser = (): void => {
    this.loggedInUser = new User(1234, 'John', 'Doe');
    this.loggedInUser.setAvatar('../../assets/john_doe.jpg');
  }

  getLoggedInUser = (): User => {
    return this.loggedInUser;
  }

}
