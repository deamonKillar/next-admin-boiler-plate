//** Define the Base response structure */
export interface BaseResponse {
  status: boolean;
  message: string;
  statusCode: string;
}

//** Define the Base result structure */
export interface BaseResult {
  total: number | null;
  currentPage: number | null;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

//** Define the Base filter structure */
export interface BaseFilter {
  key: string;
  default: {
    search?: string;
  };
}

//** User Module */
export interface IUser {
  id: number;
  full_name: string;
  email: string;
  mobile: string;
  is_active: number;
  password: string;
  avatar: string;
}

export interface UserPayload {
  full_name?: any;
  email?: any;
  mobile?: any;
  password?: any;
}

export interface IUsers extends BaseResponse {
  result: BaseResult & {
    items: IUser[];
  };
}

//**Role Module */
export interface IRole {
  id: number;
  role: string;
}

export interface IRoles extends BaseResponse {
  result: BaseResult & {
    items: IRole[];
  };
}

//**Permission Module */
export interface IPermission {
  id: number;
  name: string;
  role_id: number;
  permission: {
    manage: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

export interface IPermissions extends BaseResponse {
  result: BaseResult & {
    items: IPermission[];
  };
}

// ** Login payload
export interface LoginPayload {
  email: string;
  password: string;
}

// ** RefreshToken payload
export interface RefreshToken {
  refreshToken: string | null;
}

//**User registration payload*/
export interface RegisterUserPayload {
  full_name: string;
  password: string;
  email: string;
  mobile: string;
}

//**Reset password payload*/
export interface ResetPasswordPayload {
  token: any;
  new_password: string;
  confirm_password: string;
}

//**Forgot password payload*/
export interface ForgotPasswordPayload {
  email: string;
}

//**Setting payload */
export interface SettingPayload {
  id?: any;
  title?: any;
  logo?: any;
}

//Tenant modal
export interface ITenant {
  id: number;
  slug: string;
  db_name: string;
  db_host: string;
  db_username: string;
  db_password: string;
  db_port: number;
}

export interface ITenants extends BaseResponse {
  result: BaseResult & {
    items: ITenant[];
  };
}

//Subscriprion Modal
export interface ISubscription {
  id: number;
  plan_type: string;
  plan_period: string;
  expired_at: string;
  subscribed_at: string;
  is_active: number;
  monthly_price: number;
  yearly_price: number;
  free_trial_days: number;
}

export interface ISubscriptions extends BaseResponse {
  result: BaseResult & {
    subscription_plans: ISubscription[];
  };
}

//Plan modal
export interface IPlan {
  id?: number;
  plan_type: string;
  monthly_price: number;
  yearly_price: number;
  free_trial_days?: number;
}


export interface PlanPayload {
  plan_type?: any;
  monthly_price?: any;
  yearly_price?: any;
  free_trial_days?: any;
}