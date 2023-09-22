import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit{
  p: number = 1;
  deleted_user;
  searchTrashUserText;
  allUsers;

  constructor(){}
  ngOnInit(): void {
    this.allUsers = JSON.parse(localStorage.getItem("users"));
    if (localStorage.getItem("deleted_user") == null) {
      localStorage.setItem("deleted_user", '[]')
    }
    this.deleted_user = JSON.parse(localStorage.getItem("deleted_user"))
  }

  searchTrashUser(){
    let allData = JSON.parse(localStorage.getItem('deleted_user'));
    let tempData = allData.filter((e) => Object.values(e).join(',').toLowerCase().includes(this.searchTrashUserText))
    this.deleted_user = tempData
  }

  // ----------------- Recover Trash Row
  updateTrashRow(id){
    let allId = [];
    this.allUsers.map((e) => {
        allId.push(e.id);
    })
    for (let i = 0; i < allId.length; i++) {
        for (let j = i + 1; j < allId.length; j++) {
            let a = 0;
            if (allId[i] > allId[j]) {
                a = allId[i];
                allId[i] = allId[j];
                allId[j] = a;
            }
        }
    }
    console.log('allIdArr :', allId);
    let newId
    for (let i = 0; i < allId.length; i++) {
        newId = allId[i] + 1;
    }
    if(newId === undefined){
        newId = 0;
    }
    //  = allUsers.length + 1;
    let rowCount = this.deleted_user.findIndex((e) => e.id == id);
    let mainRow = this.deleted_user[rowCount];
    mainRow.id = newId
    this.allUsers.push(mainRow);
    localStorage.setItem("users", JSON.stringify(this.allUsers));
    this.deleted_user.splice(rowCount, 1);
    localStorage.setItem("deleted_user", JSON.stringify(this.deleted_user));
    // displayOnTrashTable();
    // displayOnTable();
    // pagination();
    // pageChange(1);
  }



  // ----------------- Delete Trash Row
  deleteTrashRow(id){
    let row = this.deleted_user.findIndex((e) => e.id == id);
    console.log(row);
    this.deleted_user.splice(row, 1)
    localStorage.setItem("deleted_user", JSON.stringify(this.deleted_user));
    // displayOnTrashTable();
    // pagination();
    // pageChange(1);
  }

  // ----------------- Delete Whole Trash
  deleteAllTrash(){
    this.deleted_user = [];
    localStorage.setItem("deleted_user", JSON.stringify(this.deleted_user));
  }


}
