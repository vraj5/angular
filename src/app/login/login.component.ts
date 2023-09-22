import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  pass = "";
  siteKey: string;

  constructor(private toastr: ToastrService, private router: Router) {
    this.siteKey = '6LeMqxsoAAAAAAIWOaJKo6tbeE4yB61ioaU9q3QP';
  }

  ngOnInit(): void {
    // Toastr for Authentication Failed
    this.toastr.error("Session Expired : Please Login")
    // ----------------------------- Main Admin -----------------------------
    let admin_credintials: any = [{username:"vrajpatoliya",password:123456}];
    if (localStorage.getItem("admin") == null) {
      localStorage.setItem("admin", JSON.stringify(admin_credintials))
    }
    // ----------------------------- Main Admin -----------------------------
    if (localStorage.getItem("admin-status") == null) {
      localStorage.setItem("admin-status", 'true')
    }
  }
  loginBtn() {
    let admin_status = localStorage.getItem("admin-status");
    let admin = localStorage.getItem("admin");
    let admin_arr;
    if(admin !==  null){
      admin_arr = JSON.parse(admin);
    }
    admin_arr.map((e: any)=>{
      if(this.username == e.username){
        if(this.pass == e.password){
          admin_status = 'true';
          localStorage.setItem("admin-status",admin_status);
          this.toastr.success("Login Successfully");
        }
      }else{
        if(e.username !== this.username || e.password !== this.pass){
          this.toastr.warning("Please Enter Valid Username & Password !!");
        }
      }
    })
    if(admin_status == 'true'){
      this.router.navigate(['/dashboard']);
    }

  }

}
