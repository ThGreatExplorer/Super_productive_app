// // export class PostedMessage {
// //   premium: boolean;
// //   sender: string;
// //   text: string;

// //   constructor({ premium, sender, text }: PostedMessage) {
// //     this.premium = premium;
// //     this.sender = sender;
// //     this.text = text;
// //   }
// // }
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

// export interface MusicFeatureNFT {
//   nftId: string;
//   accountId: string;
//   feature: string;
// }

export const POINT_ONE = '100000000000000000000000';

export class PostedMessage {
  premium: boolean;
  sender: string;
  text: string;

  constructor({ premium, sender, text }: PostedMessage) {
    this.premium = premium;
    this.sender = sender;
    this.text = text;
  }
}