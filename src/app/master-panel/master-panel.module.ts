import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterPanelRoutingModule } from './master-panel-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { TrashComponent } from './trash/trash.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MasterPanelComponent } from './master-panel.component';
import { AdminComponent } from './admin/admin.component';
import { AuthorsComponent } from './authors/authors.component';
import { FormsModule } from '@angular/forms';
import { FormModalComponent } from './form-modal/form-modal.component';
import { UserInfoComponent } from './user-info/user-info.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminFormComponent } from './admin-form/admin-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FormComponent,
    TableComponent,
    TrashComponent,
    HeaderComponent,
    SidebarComponent,
    MasterPanelComponent,
    AdminComponent,
    AuthorsComponent,
    FormModalComponent,
    UserInfoComponent,
    AdminFormComponent,
  ],
  imports: [
    CommonModule,
    MasterPanelRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class MasterPanelModule { }
