import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  totalUsers;
  totalDeletedUsers;
  totalAuthors;
  authors;
  deletedUsers;
  allUsers;
  indianUser = 0;
  americaUser = 0;
  londonUser = 0;
  australiaUser = 0;
  gujaratUser =0;
  maharashtraUser =0;
  californiaUser =0;
  hawaiiUser =0;
  parisUser =0;
  englandUser=0;
  victoriaUser=0;
  valesUser=0;


  constructor(){}
  ngOnInit(): void {
    // --------- all users
    let userCount =1;
    this.allUsers = JSON.parse(localStorage.getItem('users'));
     this.allUsers.map((e)=>{
      this.totalUsers = userCount++;
    })
    if(this.totalUsers == undefined){
      this.totalUsers = 0;
    }
    // --------- Deleted users
    let deleteUserCount =1;
    this.deletedUsers = JSON.parse(localStorage.getItem('deleted_user'));
     this.deletedUsers.map((e)=>{
      this.totalDeletedUsers = deleteUserCount++;
    })
    if(this.totalDeletedUsers == undefined){
      this.totalDeletedUsers = 0;
    }
    // --------- Deleted users
    let authorCount =1;
    this.authors = JSON.parse(localStorage.getItem('admin'));
     this.authors.map((e)=>{
      this.totalAuthors = authorCount++;
    })
    if(this.totalAuthors == undefined){
      this.totalAuthors = 0;
    }

    // ---------------------------
    // -------- Location ----------
    // ---------------------------
    this.allUsers = JSON.parse(localStorage.getItem('users'));
    this.allUsers.map((e)=>{
      if(e.country == 'India'){
        this.indianUser++;
      }
      if(e.country == 'America'){
        this.americaUser++;
      }
      if(e.country == 'London'){
        this.londonUser++;
      }
      if(e.country == 'Australia'){
        this.australiaUser++;
      }
      if(e.state == 'Gujarat'){
        this.gujaratUser++;
      }
      if(e.state == 'Maharashtra'){
        this.maharashtraUser++;
      }
      if(e.state == 'California'){
        this.californiaUser++;
      }
      if(e.state == 'Hawaii'){
        this.hawaiiUser++;
      }
      if(e.state == 'Paris'){
        this.parisUser++;
      }
      if(e.state == 'England'){
        this.englandUser++;
      }
      if(e.state == 'Vales'){
        this.valesUser++;
      }
      if(e.state == 'Victoria'){
        this.victoriaUser++;
      }
    })
  }
}