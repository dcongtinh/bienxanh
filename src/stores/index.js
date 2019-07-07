import AuthStore from './auth'
import AlertStore from './alert'

class RootStore {
    constructor() {
        this.auth = new AuthStore(this)
        this.alert = new AlertStore(this)
    }
}

const rootStore = new RootStore()
export default rootStore
