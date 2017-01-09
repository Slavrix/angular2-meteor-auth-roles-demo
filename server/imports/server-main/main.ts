import { Roles } from "meteor/alanning:roles";

export class Main {
  start(): void {
    this.createAdmin();
  }

  createAdmin(): void {
    let admin = {
      name: "admin",
      email: "admin@email.com",
      roles: ["admin"]
    };

    let bob: any = Accounts.findUserByEmail(admin.email);
    // console.log(bob);
    if (!bob) {
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
}
