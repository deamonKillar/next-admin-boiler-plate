import { ForgotPasswordPayload, IPermission, IPermissions, LoginPayload, RegisterUserPayload, ResetPasswordPayload, } from '@/common/types';
import { sendGETRequest, sendPOSTRequest, sendPUTRequest } from './apiUtils';

class AuthApi {
    static apiPath = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
    static fullApiPath = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/tenant1`


    static async login(payload: Partial<LoginPayload>) {
        try {
            const response = await sendPOSTRequest<LoginPayload>(`${this.apiPath}/auth/login`, payload);
            return response; // Return the response data
        } catch (error) {
            throw error;
        }
    }

    static async userDetails() {
        try {
            const response = await sendGETRequest(`${this.apiPath}/user/single`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async refreshToken() {
        try {
            const response = await sendGETRequest(`${this.apiPath}/refresh-token`)
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async register(payload: RegisterUserPayload) {
        try {
            const response = await sendPOSTRequest<RegisterUserPayload>(`${this.apiPath}/auth/register`, payload)
            return response;
        }
        catch (error) {
            throw error;
        }
    }

    static async resetPassword(payload: ResetPasswordPayload) {
        try {
            const response = await sendPUTRequest<ResetPasswordPayload>(`${this.apiPath}/auth/reset-password`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async forgotPassword(payload: ForgotPasswordPayload) {
        try {
            const response = await sendPOSTRequest<ForgotPasswordPayload>(`${this.apiPath}/auth/forgot-password`, payload);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async getNavigationMenues() {
        try {
            const response = await sendGETRequest(`${this.apiPath}/auth/navigationMenus`)
            return response;
        } catch (error) {
            throw error;
        }
    }


    static async getPermissions(roleId: any) {
        const permissions = await sendGETRequest<IPermissions>(`${this.apiPath}/Auth/modules/${roleId}`)
        return permissions as unknown as IPermission;
    }

    
    static async exportData(type: string) {
        const response = await sendGETRequest(
            `${this.apiPath}/Auth/export-data/${type}`,
        );
        return response;
    }
}


export default AuthApi;
