import { Status } from './../enums/status';
export class User {

  private id: number;
  private firstName: string = '';
  private lastName: string = '';
  private avatar: string = '';
  private status: Status = Status.ONLINE;

  constructor(id: number, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFirstName = (): string => {
    return this.firstName;
  }

  getLastName = (): string => {
    return this.lastName
  }

  getFullName = (): string => {
    return this.firstName + " " + this.lastName;
  }

  getId = (): number => {
    return this.id;
  }

  setAvatar = (avatar: string): void => {
    this.avatar = avatar;
  }

  getAvatar = (): string => {
    return this.avatar;
  }

  setStatus = (status: Status): void => {
    this.status = status;
  }

  getStatus = (): Status => {
    return this.status;
  }


}
