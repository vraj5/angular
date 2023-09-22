import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminFormComponent } from '../admin-form/admin-form.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit{
  p: number = 1;
  admin;

  constructor(private modalService: NgbModal){}
  ngOnInit(): void {
    this.admin = JSON.parse(localStorage.getItem("admin"));
    // ----------- Add Admin if not in local storage
    if (localStorage.getItem("admin") == null) {
      localStorage.setItem("admin", '[]')
    }
  }
  // --------------------------- Open Editing Modal
  addAuthor(sendData){
    const modalRef = this.modalService.open(AdminFormComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.user = sendData;
  }
  deleteAdmin(username){
    let row = this.admin.findIndex((e) => e.username == username);
    let rowInner = this.admin[row]
    console.log('rowInner :', rowInner);
    this.admin.splice(row, 1)
    localStorage.setItem("admin", JSON.stringify(this.admin));
  }
}
