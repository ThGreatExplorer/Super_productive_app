export class Task {
  name: string;
  description: string;
  completed: boolean;
  owner: string;

  constructor({ name, description, completed, owner }: Task) {
    this.name = name;
    this.description = description;
    this.completed = completed;
    this.owner = owner;
  }
}