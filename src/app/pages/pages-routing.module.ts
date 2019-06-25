import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component'
import { IssueListComponent } from './issue-list/issue-list.component'
import { CartableComponent } from './cartable/cartable.component'
import { ReportsComponent } from './reports/reports.component'
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'profile',
      component : ProfileComponent,
    },
    {
      path: 'issues',
      component : IssueListComponent,
    },
    {
      path: 'cartable',
      component : CartableComponent,
    },
    {
      path: 'report',
      component : ReportsComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
