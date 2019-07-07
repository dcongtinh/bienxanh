export const authTokenKey = '@bienxanh:authToken'

export const saveToken = token => {
    return localStorage.setItem(authTokenKey, token)
}

export const getToken = token => {
    return localStorage.getItem(authTokenKey)
}

export default {
    saveToken,
    getToken
}
