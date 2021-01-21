import { Injectable } from "@angular/core";
import { User } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userList: User[] = [];

  constructor() {

  }

  private fetchUsers = (): void => {
    const user1: User = new User(12345, 'Adam', 'Driver');
    user1.setAvatar('../../assets/adam_driver.jpg');
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

}
