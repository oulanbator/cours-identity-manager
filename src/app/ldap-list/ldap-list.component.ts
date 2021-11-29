import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserLdap} from "../model/user-ldap";
import {MatPaginator} from "@angular/material/paginator";
import {LDAP_USERS} from "../model/ldap-mock-data";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {UsersService} from "../service/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css']
})
export class LdapListComponent implements OnInit {

  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);
  unactiveSelected = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService: UsersService, private router: Router) {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) =>
      this.filterPredicate(data, filter);
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        if (this.unactiveSelected) {
          this.dataSource.data = users.filter(user => user.active === false);
        } else {
          this.dataSource.data = users;
        }
      }
    );
  }

  private filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  unactiveChanged($event: MatSlideToggleChange) {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  edit(login: string) {
    this.router.navigate(['/users', login]).then((e) => {
      if (!e) {
        console.log("Navigation has failed !")
      }
    })
  }
}
