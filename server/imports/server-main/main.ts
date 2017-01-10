import { Roles } from "meteor/alanning:roles";

export class Main {
  start(): void {
    Accounts.onCreateUser((options, user) => {
      console.log("new user");
      console.log(user);
      console.log(options);

      user.profile = options.profile;
      user.roles = options.roles || ["spectator"];
      console.log(user);
      
      Roles.addUsersToRoles(user._id, user.roles, Roles.GLOBAL_GROUP);

      return user;
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
