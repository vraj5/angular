import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'registration';
  admin_status = localStorage.getItem("admin-status");
  constructor(private router: Router, private toastr: ToastrService) { }
  ngOnInit() {
    // if (this.admin_status == 'true') {
    // this.router.navigate(['/dashboard']);
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }



  reload_page() {
    return location.reload();
  }
}