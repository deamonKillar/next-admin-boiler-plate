import { SettingPayload } from "@/common/types";
import { sendGETRequest, sendPOSTRequest } from "./apiUtils";

class SettingsApi {
  static apiPath = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  static async getLogo() {
    try {
      const response = await sendGETRequest(`${this.apiPath}/setting`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async updateSetting(payload: SettingPayload) {
    try {
      const response = await sendPOSTRequest(
        `${this.apiPath}/settings/update-settings`,
        payload
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default SettingsApi;
