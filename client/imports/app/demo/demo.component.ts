import { Component, OnInit, OnDestroy} from "@angular/core";
import { Meteor } from "meteor/meteor";
import {MeteorComponent} from "angular2-meteor";
import { Observable, Subscription } from "rxjs";
import { MeteorObservable } from "meteor-rxjs";
import { InjectUser } from "angular2-meteor-accounts-ui";
import { Roles } from "meteor/alanning:roles";
import { DemoDataService } from "./demo-data.service";
import { Demo } from "../../../../both/models/demo.model";
import template from "./demo.component.html";
import style from "./demo.component.scss";

@Component({
  selector: "demo",
  template,
  styles: [ style ]
})
@InjectUser("user")
export class DemoComponent extends MeteorComponent implements OnInit, OnDestroy {
  greeting: string;
  //  data: Observable<Demo[]>;
  user: Meteor.User;
  userList: any = [];
  roles: any = [];
  // userListSub: Subscription;
  nameOfUser: string;
  newUser: any = {
    name: "",
    email: "",
    role: ""
  };
  selectedUser = null;

  constructor(
    //  private demoDataService: DemoDataService
    ) {
    super();
    this.greeting = "Hello";
  }

  ngOnInit() {
    MeteorObservable.autorun().subscribe(() => {
      if (Meteor.userId()) {
        // console.log("we logged in");
        Meteor.subscribe("usersList", Meteor.userId());
        this.userList = Meteor.users.find().fetch();

        Meteor.call("getRoles", Meteor.userId(), (error, data) => {
          if (!error) {
            this.roles = data;
            console.log("roles", this.roles);
          } else {
            console.log("error: ", error);
          }
        });
        console.log("user list", this.userList);
      } else {
        this.userList = [];
        this.roles = [];
        // console.log("we logged out");
      }
    });
  }

  checkRoles(role) {
    return Roles.userIsInRole(this.user, role);
  }

  getRoles() {
    return Roles.getRolesForUser(this.user);
  }

  updateProfile() {
    // all users can update their own names
    Meteor.users.update(Meteor.userId(), {
      $set: {
        "profile": {
          "name": this.nameOfUser
        }
      }
    }, (data) => {
      console.log("update profile: ", data);
    });
  }

  createUser(form) {
    // create a new user, only admin can do this
    Meteor.call("createNewUser", this.newUser, () => {
      form.reset();
      this.newUser = {
        name: "",
        email: "",
        role: ""
      };
      form.reset();
    });
  }

  updateUser(user, form, e) {
    // update a current user, only admin can do this
    // can change the name and the role
    this.stopPropegation(e);
    Meteor.call("updateUser", user, () => {
      this.selectedUser = null;
      form.reset();
    });
  }

  ngOnDestroy() {
    this.userList = [];
    this.roles = [];
  }

  selectUsertoUpdate(ind) {
    if (this.selectedUser === ind) {
      this.selectedUser = null;
    } else {
      this.selectedUser = ind;
    }
  }

  stopPropegation(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }
}
