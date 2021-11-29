import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserLdap} from "../model/user-ldap";
import {UsersService} from "../service/users.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-ldap-detail',
  templateUrl: './ldap-detail.component.html',
  styleUrls: ['./ldap-detail.component.css']
})
export class LdapDetailComponent implements OnInit {

  user: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;

  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    // groupe de données imbriquées
    passwordGroup: this.fb.group(
      {
      password: [''],
      confirmPassword: ['']
      },
      {validators: null} //passwordValidator
    ),
    mail: {value: '', disabled: true}
  })

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    const login = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(login).subscribe(user => {
        this.user = user;
        console.log('LdapDetail getUser = ');
        console.log(user);
      }
    );
  }

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }

  goToLdap(): void {
    this.router.navigate(['/users/list']).then();
  }

  onSubmitForm(): void {
    // Validation des données.........
  }

  updateLogin(): void {
    this.userForm.get('login').setValue(
      (this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase()
    );
    this.updateMail();
  }

  updateMail(): void {
    this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase() + '@espi.lan');
  }

  isFormValid(): boolean {
    return false;
  }
}
