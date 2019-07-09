import { observable, action } from 'mobx'
import { saveToken } from 'utils/auth'
import userAPI from 'api/user.api'

class AuthStore {
    @observable isAuthenticated = false
    @observable me = null
    @observable isFetchingMe = true
    @observable isLoggingIn = false
    @observable isRegisterinng = false

    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @action
    async fetchMe() {
        this.isFetchingMe = true
        const { success, data } = await userAPI.me()
        if (success) {
            this.me = data
            this.isAuthenticated = true
        } else {
            this.me = null
            this.isAuthenticated = false
            saveToken('')
        }
        this.isFetchingMe = false
    }

    @action
    async login({ username, password }) {
        this.isLoggingIn = true
        let { success, data } = await userAPI.login({ username, password })
        if (success) {
            saveToken(data.token)
            this.me = data.user
            this.isAuthenticated = true

            this.rootStore.alert.show({
                message: `Xin chào, ${data.user.username}!`,
                variant: 'success'
            })
        } else {
            data = JSON.parse(JSON.stringify(data))
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
            this.isAuthenticated = false
            this.me = null
        }
        this.isLoggingIn = false
    }

    @action
    async register({
        firstname,
        lastname,
        username,
        password,
        email,
        callback
    }) {
        this.isRegisterinng = true
        const { success, data } = await userAPI.register({
            firstname,
            lastname,
            username,
            password,
            email
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Tạo tài khoản thành công!`,
                variant: 'success'
            })
            callback()
        } else {
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        }
        this.isRegisterinng = false
    }

    @action
    logout() {
        this.isAuthenticated = false
        this.me = null
        saveToken('')
    }
}

export default AuthStore
