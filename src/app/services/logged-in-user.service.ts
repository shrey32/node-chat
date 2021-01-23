import { User } from './../models/user';
import { Injectable } from "@angular/core";

class Flags {
  static flag = true;
}

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  private loggedInUser: User = <User>{};

  constructor() {
    this.setLoggedInUser();
  }

  private setLoggedInUser = (): void => {
    if (Flags.flag) {
      this.loggedInUser = new User(1234, 'John', 'Doe');
      this.loggedInUser.setAvatar('../../assets/john_doe.jpg');
      Flags.flag = false;
    } else {
      this.loggedInUser = new User(12345, 'Adam', 'Driver');
      this.loggedInUser.setAvatar('../../assets/adam_driver.jpg');
    }
  }

  getLoggedInUser = (): User => {
    return this.loggedInUser;
  }

}
