import { observable, action } from 'mobx'
import { getToken, saveToken } from 'utils/auth'
import userAPI from 'api/user.api'

class AuthStore {
    @observable isAuthenticated = false
    @observable me = null
    @observable isFetchingMe = true
    @observable isLoggingIn = false

    @action
    async fetchMe() {
        this.isFetchingMe = true
        console.log(getToken())
        const { success, data } = await userAPI.me()
        if (success) {
            this.me = data
            console.log(JSON.parse(JSON.stringify(this.me)))
            this.isAuthenticated = true
            console.log('isAuthenticated', data)
        } else {
            this.me = null
            this.isAuthenticated = false
            saveToken('')
            console.log('isNotAuthenticated', data)
        }
        this.isFetchingMe = false
    }

    @action
    async login({ username, password }) {
        this.isLoggingIn = true
        const { success, data } = await userAPI.login({ username, password })
        if (success) {
            saveToken(data.token)
            this.me = data.user
            this.isAuthenticated = true
        } else {
            alert(JSON.stringify(data))
            this.isAuthenticated = false
            this.me = null
        }
        this.isLoggingIn = false
    }

    @action
    async register({ username, password, email }) {
        const { success, data } = await userAPI.register({
            username,
            password,
            email
        })
        if (success) {
            alert('Register successfully!!')
        } else {
            alert(JSON.stringify(data))
        }
    }

    @action
    logout() {
        this.isAuthenticated = false
        this.me = null
        saveToken('')
    }
}

export default AuthStore
