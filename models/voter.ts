export class Voter {
  id: string;
  name: string;
  email: string;

  constructor(id: string, name: string, email: string) {
    (this.id = id), (this.name = name), (this.email = email);
  }
}
