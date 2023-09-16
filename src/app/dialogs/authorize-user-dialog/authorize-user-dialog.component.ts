import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { RoleService } from 'src/app/services/common/models/role.service';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { MatSelectionList } from '@angular/material/list';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.scss']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnDestroy, OnInit {
  constructor(
    private roleService: RoleService,
    dialogref: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private toastr: CustomToastrService
  ) {
    super(dialogref)
  }

  isLoading: boolean = false;

  datas: { roles: List_Role[], totalCount: number };
  _assignedRoles: Array<string>
  listRoles: { name: string, selected: boolean }[]


  async ngOnInit() {
    this.isLoading=true;
    this._assignedRoles = await this.userService.getRolesToUser(this.data);

    this.datas = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.datas.roles.map((r: any) => {
      return {
        name: r.name,
        selected: this._assignedRoles?.indexOf(r.name) > -1
      }
    });
    this.isLoading=false;  
  }

  ngOnDestroy(): void {

  }

  assignRoles(rolesComponent: MatSelectionList) {
    var selectedRoles: string[] = []
    rolesComponent.selectedOptions.selected.forEach(e => {
      var element = e._elementRef.nativeElement.innerText
      selectedRoles.push(element)
    })
    this.isLoading = true;
    this.userService.assignRoleToUser(this.data,selectedRoles, () => {
      this.toastr.message('Başarılı', `rol atama işlemi başarılı!`, ToastrMessageType.Info, ToastrPosition.TopRight)
      this.isLoading = false;
    }, error => {
      this.toastr.message('Hata', `rol atama işlemi başarsız; ${error}!`, ToastrMessageType.Error, ToastrPosition.TopRight)
      this.isLoading = false;
    })

  }

}