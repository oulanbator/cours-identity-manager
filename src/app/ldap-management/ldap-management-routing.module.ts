import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LdapListComponent} from "./ldap-list/ldap-list.component";
import {LdapAddComponent} from "./ldap-add/ldap-add.component";
import {LdapEditComponent} from "./ldap-edit/ldap-edit.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import { AuthGuard } from '../security/auth.guard';
import { AppComponent } from '../app.component';

const routes: Routes = [
  {
    path: 'users',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      {path:'list', component: LdapListComponent},
      {path:'add', component: LdapAddComponent},
      {path:':id', component: LdapEditComponent},
      {path:'', redirectTo: '/users/list', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LdapManagementRoutingModule { }
