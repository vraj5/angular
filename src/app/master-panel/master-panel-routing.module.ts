import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import {FormComponent} from './form/form.component'
import { SidebarComponent } from './sidebar/sidebar.component'
import { TableComponent } from './table/table.component'
import { TrashComponent } from './trash/trash.component'
import { WebsiteComponent } from '../website/website.component';
import { AdminComponent } from './admin/admin.component';
import { AuthorsComponent } from './authors/authors.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "form",
    component: FormComponent
  },
  {
    path: "table",
    component: TableComponent
  },
  {
    path: "trash",
    component: TrashComponent
  },
  {
    path: "admin",
    component: AdminComponent
  },
  {
    path: "website",
    component: AdminComponent
  },
  {
    path: "authors",
    component: AuthorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterPanelRoutingModule { }
