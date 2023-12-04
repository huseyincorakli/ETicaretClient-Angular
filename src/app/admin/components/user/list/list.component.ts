import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_User } from 'src/app/contracts/users/list_user';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {
  constructor(
    private userService: UserService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private dialogService: DialogService

  ) {
    super(spinner)
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['userName','nameSurname','email','twoFactorEnabled','role', 'delete'];
  dataSource: MatTableDataSource<List_User> = null;
  userName:string=""
  
  getUserByName(data:any){
    this.userName=data.target.value
    this.getUsers();
  }
  async getUsers() {
    this.showSpinner(SpinnerType.Clock)
    const allUsers: { totalUsersCount: number, users: List_User[] } =
      await this.userService.getAllUsers(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        this.userName,
        () => this.hideSpinner(SpinnerType.Clock),
        errorMessage => {
          this.alertify.message(errorMessage,
            { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight })
        })

    this.dataSource = new MatTableDataSource<List_User>(allUsers.users)
    this.paginator.length = allUsers.totalUsersCount
  }
  async pageChange() {
    await this.getUsers();
  }

  async ngOnInit() {
    await this.getUsers();
  }
  assignRole(id:string){
   this.dialogService.openDialog({
    componentType:AuthorizeUserDialogComponent,
    data:id,
    options:{
      width:"600px"
    }
   }) 
  }

}
