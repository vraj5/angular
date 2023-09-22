import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit{
  @Input() user
  adminName;
  adminPass;



  constructor(){}
  ngOnInit(): void {
      
  }
}
