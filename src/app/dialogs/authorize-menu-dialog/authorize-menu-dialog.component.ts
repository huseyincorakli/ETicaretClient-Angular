import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { RoleService } from 'src/app/services/common/models/role.service';
import { MatSelectionList } from '@angular/material/list';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { Position } from 'src/app/services/admin/alertify.service';
declare var $: any

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnDestroy, OnInit {
  constructor(
    private roleService: RoleService,
    dialogref: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authorizationService: AuthorizationEndpointService,
    private toastr: CustomToastrService
  ) {
    super(dialogref)
  }

  isLoading: boolean = false;

  datas: { roles: List_Role[], totalCount: number };
  _assignedRoles: Array<string>
  listRoles: { name: string, selected: boolean }[]


  async ngOnInit() {
    this._assignedRoles = await this.authorizationService.getRolesToEndpoint(this.data.code, this.data.menuName);

    this.datas = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.datas.roles.map((r: any) => {
      return {
        name: r.name,
        selected: this._assignedRoles?.indexOf(r.name) > -1
      }
    });  
  }

  ngOnDestroy(): void {

  }

  assignRoles(rolesComponent: MatSelectionList) {
    var selectedRoles: string[] = []
    rolesComponent.selectedOptions.selected.forEach(e => {
      var element = e._elementRef.nativeElement.innerText
      selectedRoles.push(element)
    })

    console.log(selectedRoles);
    this.isLoading = true;
    this.authorizationService.assignRoleEndpoint(selectedRoles, this.data.code, this.data.menuName, () => {
      this.toastr.message('Başarılı', `${this.data.menuName}'ın ilgili endpointine rol atama işlemi başarılı!`, ToastrMessageType.Info, ToastrPosition.TopRight)
      this.isLoading = false;
    }, error => {
      this.toastr.message('Hata', `${this.data.menuName}'e rol atama işlemi başarsız; ${error}!`, ToastrMessageType.Error, ToastrPosition.TopRight)
      this.isLoading = false;
    })

  }

}
export enum AuthorizeMenuState {
  Yes,
  No
}
