import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { userInfo } from 'os';
import { $ } from 'protractor';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
 loginForm: FormGroup;
 CurrentUser: firebase.User;
 RegistrationForm: FormGroup;
 restPass: FormGroup;
 isLoggedIn = false;
  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(
            (user) => {
              if (user) {
                console.log(user);
                this.CurrentUser = user;
                this.isLoggedIn = true;
                console.log(this.CurrentUser);
              } else {
              }
            }
          );
   }

  HdBar = false;
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if (window.pageYOffset >= 50) {
      this.HdBar = true;
    } else {
      this.HdBar = false;
    }
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        [Validators.required, Validators.email]),
      LPassword: new FormControl('',
      [Validators.required, Validators.minLength(6)]),
    }),
    this.RegistrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('',
        [Validators.required, Validators.email]),
      password: new FormControl('',
      [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('',
      [Validators.required, Validators.minLength(6)]),
      company: new FormControl(),
      phoneNumber: new FormControl(),
      Age: new FormControl()
    }),
    this.restPass = new FormGroup({
      email: new FormControl('',
      [Validators.required, Validators.email]),
    });
  }

SignIn(): void {
  this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.LPassword).then(e => {
      console.log(e);
      location.reload();
  }).catch(error => {
alert(error);
  });
}
logout(): void {
  this.afAuth.auth.signOut()
    .then((res) => location.reload());
}
GoogleLogin(): void {
  this.afAuth.auth.signInWithPopup(
    new firebase.auth.GoogleAuthProvider()
  ).then(e => {
    location.reload();
  });
}
resetPassword(): void {
  this.afAuth.auth.sendPasswordResetEmail(this.restPass.value.email).then(ree => {
      alert('Password Rest Email has been Send Against this Email Address');
  }).catch(error => {
    alert(error.message);
  });
}
Registration(): void {
  console.log(this.RegistrationForm.value);
if (this.RegistrationForm.value.password == this.RegistrationForm.value.confirmPassword){
    this.afAuth.auth.createUserWithEmailAndPassword(this.RegistrationForm.value.email, this.RegistrationForm.value.password).then(user => {
      console.log(user);
     const data = {
      company: this.RegistrationForm.value.company,
      phoneNumber: this.RegistrationForm.value.phoneNumber,
      Age: this.RegistrationForm.value.Age
      };
      this.afAuth.auth.currentUser.updateProfile({
          displayName: this.RegistrationForm.value.name,

        }).then(function() {
          firebase.database().ref('UsersInfo/' + user.user.uid).set(data).then(e => {
            alert('You have register Successfully');
            location.reload();
          });

        });
    }).catch(error => {
      alert(error.message);
    });
} else {
  alert('Confirm Password not Matched');
}
}
}
