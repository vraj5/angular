import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  constructor(private router:Router){}
  ngOnInit(): void {
  }

  logout_admin(){
    localStorage.setItem("admin-status", "false");
    this.router.navigate(['/login']);
  }
}
