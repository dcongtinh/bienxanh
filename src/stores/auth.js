import { observable, action } from 'mobx'
import { saveToken } from 'utils/auth'
import userAPI from 'api/user.api'

class AuthStore {
    @observable isAuthenticated = false
    @observable me = null
    @observable isFetchingMe = true
    @observable hasFetched = false
    @observable user = null
    @observable users = []
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
            this.hasFetched = true
            this.isAuthenticated = true
        } else {
            this.me = null
            this.hasFetched = false
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
        siteAdmin,
        access,
        callback
    }) {
        this.isRequesting = true
        const { success, data } = await userAPI.register({
            firstname,
            lastname,
            username,
            password,
            email,
            siteAdmin,
            access
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Tạo tài khoản thành công!`,
                variant: 'success'
            })
            if (callback) callback()
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
        this.user = null
        const { success, data } = await userAPI.getUser({
            username
        })
        if (success) this.user = data.user

        this.isRequesting = false
    }

    @action
    async fetchAllUser() {
        this.isRequesting = true
        const { success, data } = await userAPI.getAllUser()
        if (success) this.users = data.users
        this.isRequesting = false
    }
    @action
    async updateProfile({ username, firstname, lastname, siteAdmin, access }) {
        this.isRequesting = true
        const { success, data } = await userAPI.updateProfile({
            username,
            firstname,
            lastname,
            siteAdmin,
            access
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
    async deleteUsers({ usernames }) {
        this.isRequesting = true
        const { success, data } = await userAPI.deleteUsers({
            usernames
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Xoá tài khoản thành công!`,
                variant: 'success'
            })
            this.fetchAllUser()
        } else
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
