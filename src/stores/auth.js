import { observable, action } from 'mobx'
import { saveToken } from 'utils/auth'
import userAPI from 'api/user.api'

class AuthStore {
    @observable isAuthenticated = false
    @observable me = null
    @observable isFetchingMe = true
    @observable user = null
    @observable isRequesting = false

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
        this.isRequesting = true
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
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
            this.isAuthenticated = false
            this.me = null
        }
        this.isRequesting = false
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
        this.isRequesting = true
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
        this.isRequesting = false
    }

    @action
    async fetchUser({ username }) {
        this.isRequesting = true
        const { success, data } = await userAPI.getUser({
            username
        })
        if (success) this.user = data.user

        this.isRequesting = false
    }
    @action
    async updateProfile({ username, firstname, lastname }) {
        this.isRequesting = true
        const { success, data } = await userAPI.updateProfile({
            username,
            firstname,
            lastname
        })
        if (success)
            this.rootStore.alert.show({
                message: `Cập nhật tài khoản thành công!`,
                variant: 'success'
            })
        else
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        this.isRequesting = false
    }

    @action
    logout() {
        this.isAuthenticated = false
        this.me = null
        saveToken('')
    }
}

export default AuthStore
