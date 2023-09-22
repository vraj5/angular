import { Component, OnInit } from '@angular/core';
import { lightSpeedInAnimation } from 'angular-animations';
import { read, utils, write, writeFile } from 'xlsx'
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  p: number = 1;
  users: any[] = [];
  allUsers;
  deleted_user;
  deletePopupShow: boolean;
  deleteUser;
  new_update_row;
  searchUserText;
  paginationBtnLength;
  paginationBtns = [];
  constructor(private router: Router, private modalService: NgbModal) { }

  // ---------------------- Pagination
  // pagination(e){
  //   this.paginationBtns = [];
  //   let rowCount = e.target.value;
  //   this.paginationBtnLength = Math.ceil(this.allUsers.length / rowCount);
  //   if(rowCount < 10){
  //     rowCount = 10;
  //   }
  //   for(let i=this.paginationBtnLength;i>=1;i--){
  //     this.paginationBtns.push({count:i, row:rowCount});
  //   }
  //   let paginationuser= this.allUsers.splice((1 - 1) * rowCount, rowCount);
  //   this.allUsers = paginationuser;
  //   this.pageChange(2,rowCount);
  // }
  // pageChange(pageNum,row){
  //   this.allUsers = JSON.parse(localStorage.getItem('users'));
  //   this.allUsers.splice((pageNum - 1) * row, row)
  // }

  ngOnInit(): void {
    this.allUsers = JSON.parse(localStorage.getItem("users"));
    // ----------- Get Deleted User Item lightSpeedInAnimation
    if (localStorage.getItem("deleted_user") == null) {
      localStorage.setItem("deleted_user", '[]')
    }
    this.deleted_user = JSON.parse(localStorage.getItem("deleted_user"));
  }

  // --------------------------- Open Editing Modal
  openFormModal(){
    this.modalService.open(FormModalComponent, {
      size: 'xl'
    });
  }
  // --------------------------- Open Editing Modal
  openUpdateFormModal(sendData){
    const modalRef = this.modalService.open(FormModalComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.user = sendData;
    this.allUsers = JSON.parse(localStorage.getItem('users'));
  }
  // --------------------------- Open User Info Modal
  showUserInfo(sendData){
    const modalRef = this.modalService.open(UserInfoComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.user = sendData;
  }
  // --------------------------- Search User
  searchUser(){
    let allData = JSON.parse(localStorage.getItem('users'));
    let tempData = allData.filter((e) => Object.values(e).join(',').toLowerCase().includes(this.searchUserText));
    this.allUsers = tempData;
  }


  // --------------------------- Delete Row Confirmation Popup
  deleteUserId(id){
    this.deleteUser = id;
  }
  // --------------------------- Delete Row
  deleteRow() {
    let row = this.allUsers.findIndex((e) => e.id == this.deleteUser);
    let rowInner = this.allUsers[row]
    this.deleted_user.push(rowInner)
    localStorage.setItem("deleted_user", JSON.stringify(this.deleted_user));
    this.allUsers.splice(row, 1)
    localStorage.setItem("users", JSON.stringify(this.allUsers));
  }

  // ---------------------- Sorting First-name
  fname_sort(){
    this.allUsers.sort((a, b) => a.first_name.localeCompare(b.first_name));
  }
  // ---------------------- Sorting Last-name
  lname_sort(){
    this.allUsers.sort((a, b) => a.last_name.localeCompare(b.last_name));
  }
  // ---------------------- Sorting Age
  age_sort(){
    this.allUsers.sort((a, b) => a.age.localeCompare(b.age));
  }
  // ---------------------- Sorting Email
  email_sort(){
    this.allUsers.sort((a, b) => a.email.localeCompare(b.email));
  }
  // ---------------------- Sorting Email
  phone_sort(){
    this.allUsers.sort((a, b) => a.phone.localeCompare(b.phone));
  }
  // ---------------------- Sorting Email
  password_sort(){
    this.allUsers.sort((a, b) => a.password.localeCompare(b.password));
  }
  // ---------------------- Sorting Email
  gender_sort(){
    this.allUsers.sort((a, b) => a.gender.localeCompare(b.gender));
  }
  // ---------------------- Sorting Email
  country_sort(){
    this.allUsers.sort((a, b) => a.country.localeCompare(b.country));
  }
  // ---------------------- Sorting Email
  state_sort(){
    this.allUsers.sort((a, b) => a.state.localeCompare(b.state));
  }
  // ---------------------- Sorting Email
  city_sort(){
    this.allUsers.sort((a, b) => a.city.localeCompare(b.city));
  }
  // ---------------------- Sorting Email
  about_sort(){
    this.allUsers.sort((a, b) => a.about.localeCompare(b.about));
  }
  // ---------------------- Sorting Email
  hobbies_sort(){
    this.allUsers.sort((a, b) => a.hobbies[0].localeCompare(b.hobbies[0]));
  }
  // ---------------------- Sorting Email
  skill_sort(){
    this.allUsers.sort((a, b) => a.skill[0].localeCompare(b.skill[0]));
  }


  // importCSV($event: any) {
  //   const files = $event.target.files;
  //   if (files.length) {
  //     const file = files[0];
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       const wb = read(event.target.result);
  //       const sheets = wb.SheetNames;

  //       if (sheets.length) {
  //         const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
  //         this.users = rows;
  //       }
  //     };
  //     reader.readAsArrayBuffer(file);
  //     console.log('reader.readAsArrayBuffer(file) :', reader.readAsArrayBuffer(file));
  //   }
  // }
  exportCSV() {
    const headings = [['First Name', 'Last Name', 'Age', 'Email', 'Phone', 'Password', 'Gender', 'Hobbies', 'Skills', 'Country', 'State', 'City', 'About']];
    this.allUsers.forEach(x => {
      let tempArr = [];
      let tempHobbies = [];
      let tempSkills = [];
      tempArr.push(x.first_name);
      tempArr.push(x.last_name);
      tempArr.push(x.age);
      tempArr.push(x.email);
      tempArr.push(x.phone);
      tempArr.push(x.password);
      tempArr.push(x.gender);
      tempArr.push(x.hobbies.join(','));
      tempArr.push(x.skill.join(','));
      tempArr.push(x.country);
      tempArr.push(x.state);
      tempArr.push(x.city);
      tempArr.push(x.description);
      headings.push(tempArr)
    });
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.users, {
      origin: 'A2',
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, 'Users');
    writeFile(wb, 'User Report.xlsx')
  }
}
