import qs from "qs";
import { IPlan, PlanPayload } from "@/common/types";
import {
  sendDELETERequest,
  sendGETRequest,
  sendPOSTRequest,
  sendPUTRequest,
} from "./apiUtils";

export interface IPlansParams {
  search: string;
  sortBy: string;
  sortType: string;
  itemsPerPage: number;
  page: number;
}

class PlanApi {
  static apiPath = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  static async getPlans(params: IPlansParams) {
    const palns = await sendGETRequest<IPlan>(
      `${this.apiPath}/Subscriptions/get-plans?${qs.stringify(params)}`
    );
    return palns;
  }

  static async addPlan(plan: PlanPayload) {
    const newPlan = await sendPOSTRequest<IPlan>(
      `${this.apiPath}/Subscriptions/add-plan`,
      plan
    );

    return newPlan;
  }

  static async updatePlan(plan: IPlan) {
    const updatedPlan = await sendPUTRequest<IPlan>(
      `${this.apiPath}/Subscriptions/edit-plan`,
      plan
    );

    return updatedPlan;
  }

  static async deletePlan(plan: IPlan) {
    const deletedPlan = await sendDELETERequest(
      `${this.apiPath}/Subscriptions/delete-plan/${plan.id}`
    );

    return deletedPlan;
  }

  static async getPlanDetails(plan: IPlan) {
    const response = await sendGETRequest(
      `${this.apiPath}/Subscriptions/plan/${plan.id}`
    );
    return response;
  }
}

export default PlanApi;
