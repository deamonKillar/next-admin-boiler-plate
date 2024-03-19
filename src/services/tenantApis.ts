import qs from 'qs'
import { ITenant, ITenants } from '@/common/types'
import { sendDELETERequest, sendGETRequest, sendPOSTRequest, sendPUTRequest } from './apiUtils'

export interface ITenantsParams {
    search: string
    sortBy: string
    sortType: string
    itemsPerPage: number
    page: number
}

export interface ISubscriptionParams {
    tenantId: number
    search: string
    sortBy: string
    sortType: string
    itemsPerPage: number
    page: number
}

class TenantApi {
    static apiPath = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
    static tenantUser = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/tenant1`;

    static async getTenants(params: ITenantsParams) {
        const response = await sendGETRequest<ITenants>(`${this.apiPath}/Tenants/get-tenants?${qs.stringify(params)}`)
        return response
    }

    static async addTenant(tenant: Partial<ITenant>) {
        const response = await sendPOSTRequest<ITenant>(`${this.apiPath}/Tenants/add-tenant`, tenant)
        return response
    }

    static async updateTenant(tenant: ITenant) {
        const response = await sendPUTRequest<ITenant>(`${this.apiPath}/Tenants/edit-tenant`, tenant)
        return response
    }
    static async deleteTenant(tenant: ITenant) {
        const response = await sendDELETERequest(`${this.apiPath}/Tenants/delete-tenant/${tenant.id}`)
        return response
    }

    static async getTenantById(tenant: ITenant) {
        const response = await sendGETRequest(`${this.apiPath}/Tenants/get-tenant/${tenant.id}`)
        return response
    }

    static async getSubscriptionHistory(params: ISubscriptionParams) {
        const response = await sendGETRequest(`${this.apiPath}/Tenants/subscrioption-history?${qs.stringify(params)}`);
        return response;
    }
}
export default TenantApi;
