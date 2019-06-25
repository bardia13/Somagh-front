import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';

import { NgSelectModule } from '@ng-select/ng-select';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ProfileModule } from './profile/profile.module'

import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueButtonComponentComponent } from './issue-list/issue-button-component/issue-button-component.component';
import { AddIssueComponent } from './issue-list/add-issue/add-issue.component';
import { CartableComponent } from './cartable/cartable.component';
import { CartableButtonComponent } from './cartable/cartable-button/cartable-button.component';
import { ActionComponent } from './cartable/action/action.component';




const PAGES_COMPONENTS = [
  PagesComponent,
  IssueListComponent,
  IssueButtonComponentComponent,
  AddIssueComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    ProfileModule,
    DashboardModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
    DpDatePickerModule,
    NgSelectModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    CartableComponent,
    CartableButtonComponent,
    ActionComponent,
  ],
  entryComponents: [
    AddIssueComponent,
    ActionComponent,
  ],
})
export class PagesModule {
}
