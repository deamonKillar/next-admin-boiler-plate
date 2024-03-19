export default {
    adminEndPoint: '/users',
    registerEndpoint: '/jwt/register',
    storageTokenKeyName: 'accessToken',
    storageUserDataKeyName: 'userData',
    onTokenExpiration: 'refreshToken', // logout | refreshToken
    userLoginEndPoint: '/login',
    refreshTokenKeyName: 'refreshToken',
    timestampKeyName: 'timeStamp'
}