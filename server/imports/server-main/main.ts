import { Roles } from "meteor/alanning:roles";

export class Main {
  start(): void {
    Accounts.onCreateUser((options, user) => {
      console.log("new user");

      user.profile = options.profile || {name: ""};
      user.roles = options.roles || ["spectator"];
      console.log(user);

      Roles.addUsersToRoles(user._id, user.roles, Roles.GLOBAL_GROUP);

      return user;
    });

    Meteor.publish("usersList", (id) => {
      if (Roles.userIsInRole(id, "admin")) {
        return Meteor.users.find({}, {fields: {emails: 1, profile: 1, roles: 1}});
      } else {
        return Meteor.users.find(id);
      }
    });

    let roles = ["admin", "spectator", "coach", "player"];
    Roles.getAllRoles().map((data) => {
      roles.splice(roles.indexOf(data.name), 1);
    });
    roles.map((data) => {
      Roles.createRole(data);
    });
    this.createAdmin();
  }

  createAdmin(): void {
    let admin = {
      profile: {
        name: "admin"
      },
      password: "123456",
      email: "admin@email.com",
      roles: ["admin"]
    };

    let bob: any = Accounts.findUserByEmail(admin.email);
    // console.log(bob);
    if (!bob) {
      // Meteor.users.remove(bob._id);
      let id = Accounts.createUser(admin);
    }
  }


}
