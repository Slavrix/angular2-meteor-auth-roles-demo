import { Roles } from "meteor/alanning:roles";

let roles = ["admin", "spectator", "coach", "player"]; // should move to both??

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

    Meteor.methods({
      createNewUser: this.createNewUser,
      getRoles: this.getRoles
    });

    let tempRoles = roles.slice(0);
    Roles.getAllRoles().map((data) => {
      tempRoles.splice(tempRoles.indexOf(data.name), 1);
    });
    tempRoles.map((data) => {
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

  createNewUser(newUser, callback): any {
    let account = {
      profile: {
        name: newUser.name
      },
      password: "123456",
      email: newUser.email,
      roles: newUser.role
    };
    Accounts.createUser(account, callback);
  }

  getRoles(id) {
    // console.log(roles);
    if (Roles.userIsInRole(id, "admin")) {
      return Roles.getAllRoles().map( (data) => {
        // console.log(data);
        return data.name;
      });
      // console.log(temp);
      // return JSON.stringify(roles);
    }
  }
}
