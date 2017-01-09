import {DemoCollection} from "../../../both/collections/demo.collection";
import {Demo} from "../../../both/models/demo.model";

export class Main {
  start(): void {
    // this.initFakeData();
    this.createAdmin();
  }

  // initFakeData(): void {
  //   if (DemoCollection.find({}).cursor.count() === 0) {
  //     const data: Demo[] = [{
  //       name: "Dotan",
  //       age: 25
  //     }, {
  //       name: "Liran",
  //       age: 26
  //     }, {
  //       name: "Uri",
  //       age: 30
  //     }];
  //     data.forEach((obj: Demo) => {
  //       DemoCollection.insert(obj);
  //     });
  //   }
  // }

  createAdmin(): void {

    let admin = {
      name: "admin",
      email: "admin@email.com",
      roles: ["admin"]
    };

    let bob: any = Accounts.findUserByEmail(admin.email);
    Meteor.users.remove(bob._id);

    let id = Accounts.createUser({
      email: admin.email,
      password: "123456",
      profile: {
        name: admin.name
      }
    });
    Roles.addUsersToRoles(id, admin.roles, Roles.GLOBAL_GROUP);
  }
}
