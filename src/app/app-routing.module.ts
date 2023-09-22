import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPanelComponent } from './master-panel/master-panel.component';
import { WebsiteComponent } from './website/website.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './master-panel/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: MasterPanelComponent,
    loadChildren: () => import('./master-panel/master-panel.module').then(e => e.MasterPanelModule)
  },
  {
    path: "website",
    component: WebsiteComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "**",
    component: MasterPanelComponent,
    loadChildren: () => import('./master-panel/master-panel.module').then(e => e.MasterPanelModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
