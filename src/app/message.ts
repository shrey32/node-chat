export class Message {

  private message: string = '';
  private mine: boolean = false;
  private time: string = '';

  constructor(message: string, mine: boolean) {
    this.message = message;
    this.mine = mine;
    this.time = new Date().toString();
  }

  getMessage = (): string => {
    return this.message;
  }

  isMine = (): boolean => {
    return this.mine;
  }

  getTime = (): string => {
    return this.time;
  }

}
