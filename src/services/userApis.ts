import qs from "qs";
import { IUser, IUsers, UserPayload } from "@/common/types";
import {
  sendDELETERequest,
  sendGETRequest,
  sendPOSTRequest,
  sendPUTRequest,
} from "./apiUtils";

export interface IUsersParams {
  search: string;
  sortBy: string;
  sortType: string;
  itemsPerPage: number;
  page: number;
}

class UserApi {
  static apiPath = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  static async getUsers(params: IUsersParams) {
    const users = await sendGETRequest<IUsers>(
      `${this.apiPath}/Users/get-users?${qs.stringify(params)}`
    );
    return users;
  }

  static async addUser(user: UserPayload) {
    const newUser = await sendPOSTRequest<IUser>(
      `${this.apiPath}/Users/add-user`,
      user
    );

    return newUser;
  }

  static async updateUser(user: IUser) {
    const updatedUser = await sendPUTRequest<IUser>(
      `${this.apiPath}/Users/edit-user`,
      user
    );

    return updatedUser;
  }

  static async deleteUser(user: IUser) {
    const deletedUser = await sendDELETERequest(
      `${this.apiPath}/Users/delete-user/${user.id}`
    );

    return deletedUser;
  }

  static async getUserDetails() {
    const response = await sendGETRequest(`${this.apiPath}/Users/user/single`);
    return response as IUser;
  }
}

export default UserApi;
