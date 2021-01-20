import { Injectable } from "@angular/core";
import { User } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class MemberUserService {

  private memberUsersList: User[] = [];

  constructor() {

  }

  private fetchMemberUsers = (): void => {
    const user1: User = new User(12345, 'Adam', 'Driver');
    user1.setAvatar('');
    const user2: User = new User(123456, 'Tom', 'Hanks');
    user2.setAvatar('');
    const user3: User = new User(123457, 'Robert', 'Di Nero');
    user3.setAvatar('');
    const user4: User = new User(123458, 'Dwayne', 'Johnson');
    user4.setAvatar('');
    this.memberUsersList = [user1, user2, user3, user4];
  }

  getMemberUsers = (): User[] => {
    this.fetchMemberUsers();
    return this.getMemberUsers();
  }

}
