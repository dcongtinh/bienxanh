import AuthStore from './auth'
import AlertStore from './alert'
import WarehouseStore from './warehouse'
import ItemStore from './item'
import UnitStore from './unit'
import OrderStore from './order'
import SupplierStore from './supplier'
import ExportStore from './export'

class RootStore {
    constructor() {
        this.auth = new AuthStore(this)
        this.wareHouse = new WarehouseStore(this)
        this.item = new ItemStore(this)
        this.unit = new UnitStore(this)
        this.order = new OrderStore(this)
        this.supplier = new SupplierStore(this)
        this.exported = new ExportStore(this)
        this.alert = new AlertStore(this)
    }
}

const rootStore = new RootStore()
export default rootStore
