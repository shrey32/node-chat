import { LoggedInUserService } from 'src/app/services/logged-in-user.service';
import { Injectable } from "@angular/core";
import { User } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList: User[] = [];

  constructor(public loggedInUserService: LoggedInUserService) {

  }

  private fetchUsers = (): void => {
    let user1: User;
    if (this.loggedInUser().getId() == 1234) {
      user1 = new User(12345, 'Adam', 'Driver');
      user1.setAvatar('../../assets/adam_driver.jpg');
    } else {
      user1 = new User(1234, 'John', 'Doe');
      user1.setAvatar('../../assets/john_doe.jpg');
    }
    const user2: User = new User(123456, 'Tom', 'Hanks');
    user2.setAvatar('../../assets/tom_hanks.jpg');
    const user3: User = new User(123457, 'Robert', 'Di Nero');
    user3.setAvatar('../../assets/robert_deniro.jpg');
    const user4: User = new User(123458, 'Dwayne', 'Johnson');
    user4.setAvatar('../../assets/dwayne_jhonson.jpeg');
    this.userList = [user1, user2, user3, user4];
  }

  getUsers = (): User[] => {
    this.fetchUsers();
    return this.userList;
  }

  private loggedInUser = (): User => {
    return this.loggedInUserService.getLoggedInUser();
  }

}
