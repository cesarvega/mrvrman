import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {FormGroup,FormControl,Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm:FormGroup;
  restPass:FormGroup;
  name:string="";
  email:string="";
  photo:string=null;
  phone:string="";
  company:string="";
  age:string="";
  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(
            (user) => {
              if (user) {                
                console.log(user);
               this.name=user.displayName;
               this.email=user.email;
               this.photo=user.photoURL;
               firebase.database().ref('UsersInfo/'+user.uid).once('value',snp=>{
                 if(snp.val()!=null){
                   this.phone=snp.val().phoneNumber;
                   this.age=snp.val().Age;
                   this.company=snp.val().company;
                 }
               })
              }
              else {
               location.href="/corp"; 
              }
            }
          );
   }
  ngOnInit() {
    this.profileForm=new FormGroup({
      name: new FormControl("",Validators.required),
      email:new FormControl(),
      company: new FormControl(),
      phoneNumber:new FormControl(),
      Age: new FormControl()
    })
    
  
  }
  hideOldModel(event:any):void{
    console.log(event);
  }
  UpdateProfile(): void {
    var data={
      phoneNumber:this.profileForm.value.phoneNumber,
      company :this.profileForm.value.company,
      Age: this.profileForm.value.Age
    }
    var user=this.afAuth.auth.currentUser;
    user.updateProfile({
    displayName:this.name
    }).then(function(){
      
      
    })
    firebase.database().ref('UsersInfo/'+user.uid).set(data).then(e=>{
      alert("Profile Updated");
      }).catch(error=>{
        alert(error.message);
      })
    
  }
  logout(): void{
    this.afAuth.auth.signOut()
      .then((res) => location.href="/corp");
  }
}
