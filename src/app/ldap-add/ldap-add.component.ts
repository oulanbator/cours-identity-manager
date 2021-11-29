import { Component, OnInit } from '@angular/core';
import {LdapDetailComponent} from "../ldap-detail/ldap-detail.component";
import {UsersService} from "../service/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-ldap-add',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.css']
})
export class LdapAddComponent extends LdapDetailComponent implements OnInit {

  constructor(usersService: UsersService,
              route: ActivatedRoute,
              fb: FormBuilder,
              router: Router) {
    super(usersService, route, fb, router);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  validateForm(): void {
    console.log('LdapAddComponent - validate form');
  }

}
