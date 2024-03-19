import qs from 'qs'
import { IRole, IRoles } from '@/common/types'
import { sendDELETERequest, sendGETRequest, sendPOSTRequest, sendPUTRequest } from './apiUtils'

export interface IRolesParams {
  search: string;
  sortBy: string;
  sortType: string;
  itemsPerPage: number;
  page: number;
}

export interface permissionObject {
  manege: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface PermissionOfRoleDataType {
  role_id: number;
  permissions: permissionObject[];
}

class RolesApi {
  static apiPath = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  static tenantRole = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/tenant1`;

  static async getRoles(params: IRolesParams) {
    const roles = await sendGETRequest<IRoles>(`${this.apiPath}/Roles/get-roles?${qs.stringify(params)}`)
        return roles;
  }

  static async addRole(role: Partial<IRole>) {
    const newRole = await sendPOSTRequest<IRole>(`${this.apiPath}/Roles/add-role`, role)
        return newRole;
  }

  static async updateRole(role: IRole) {
    const updatedRole = await sendPUTRequest<IRole>(`${this.apiPath}/Roles/edit-role`, role)
        return updatedRole;
  }

  static async deleteRole(role: IRole) {
    const deletedRole = await sendDELETERequest(`${this.apiPath}/Roles/delete-role/${role.id}`)
        return deletedRole;
    }

    static async getRoleDetails(role: IRole) {
        const roleDetails = await sendGETRequest(`${this.apiPath}/Roles/get-role/${role.id}`)
        return roleDetails as IRole
    }

    static async managePermissionsOfRole(data: PermissionOfRoleDataType) {
        const updatePermissionsOfRole = await sendPUTRequest(`${this.apiPath}/Roles/manage-permissions/${data.role_id}`, data.permissions)
        return updatePermissionsOfRole;
    }

    static async getRoleById(role: IRole) {
        const roleDetails = await sendGETRequest(`${this.apiPath}/Roles/role-detail/${role.id}`)
        return roleDetails as IRole
    }
}

export default RolesApi;
