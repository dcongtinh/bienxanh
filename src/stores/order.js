import { observable, action } from 'mobx'
import orderAPI from 'api/order.api'

class OrderStore {
    @observable hasFetched = false
    @observable orders = []
    @observable order = null
    @observable count = 0
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
    async fetchAllOrders({ page = 1, itemPerPage = 10 }) {
        this.isRequesting = true
        const { success, data } = await orderAPI.getAllOrders({
            page,
            itemPerPage
        })
        console.log('fetchAllOrders ->', success, data)
        if (success) {
            this.orders = [...this.orders, ...data.docs]
            this.count = data.total
        }
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
    async updateOrder({ idOrder, warehouse, buyerName, items, payStatus }) {
        this.isRequesting = true
        console.log(payStatus)
        const { success, data } = await orderAPI.updateOrder({
            idOrder,
            warehouse,
            buyerName,
            items,
            payStatus
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Cập nhật hoá đơn thành công!`,
                variant: 'success'
            })
            // this.fetchOrder({ idOrder })
            this.orders = []
            this.fetchAllOrders({})
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
            this.orders = []
            this.fetchAllOrders({})
        } else
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        this.isRequesting = false
    }
}

export default OrderStore
