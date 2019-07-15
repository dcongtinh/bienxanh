import AuthStore from './auth'
import AlertStore from './alert'
import WarehouseStore from './warehouse'

class RootStore {
    constructor() {
        this.auth = new AuthStore(this)
        this.wareHouse = new WarehouseStore(this)
        this.alert = new AlertStore(this)
    }
}

const rootStore = new RootStore()
export default rootStore
