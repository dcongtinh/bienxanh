import { observable, action } from 'mobx'
import orderAPI from 'api/order.api'

class OrderStore {
    @observable hasFetched = false
    @observable orders = []
    @observable order = null
    @observable isRequesting = false

    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @action
    async addOrder({ warehouse, items, owner, callback }) {
        this.isRequesting = true
        const { success, data } = await orderAPI.addOrder({
            warehouse,
            items,
            owner
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Thêm hoá đơn thành công!`,
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
    async fetchAllOrders() {
        this.isRequesting = true
        const { success, data } = await orderAPI.getAllOrders()
        if (success) this.orders = data.orders
        this.isRequesting = false
    }
    @action
    async fetchOrder({ idOrder }) {
        this.isRequesting = true
        this.order = null
        const { success, data } = await orderAPI.getOrder({
            idOrder
        })
        if (success) this.order = data.order
        this.isRequesting = false
    }

    @action
    async updateOrder({ idOrder, warehouse, items }) {
        this.isRequesting = true
        const { success, data } = await orderAPI.updateOrder({
            idOrder,
            warehouse,
            items
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Cập nhật hoá đơn thành công!`,
                variant: 'success'
            })
            this.fetchOrder({ idOrder })
        } else {
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        }
        this.isRequesting = false
    }
    @action
    async deleteOrders({ ordersListId }) {
        this.isRequesting = true
        const { success, data } = await orderAPI.deleteOrders({
            ordersListId
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Xoá hoá đơn thành công!`,
                variant: 'success'
            })
            this.fetchAllOrders()
        } else
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        this.isRequesting = false
    }
}

export default OrderStore
