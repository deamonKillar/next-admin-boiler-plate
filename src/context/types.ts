export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
    email: string
    password: string
    rememberMe?: boolean
}

export type UserDataType = {
    id: number
    role: string[]
    email: string
    password: string
    contact: string,
    verified: number
    avatar: any
    modulesPermission: any
}

export type ReactUserDateType = {
    id: number
    email: string
    password: string
    contact: string,
    verified: number
}

export type AuthValuesType = {
    loading: boolean
    logout: () => void
    user: UserDataType | null
    setLoading: (value: boolean) => void
    setUser: (value: UserDataType | null) => void
    login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
