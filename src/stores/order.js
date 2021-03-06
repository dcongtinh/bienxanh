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
    async addOrder({
        group,
        warehouse,
        buyerName,
        owner,
        date,
        itemNote,
        mergeList,
        orders,
        callback
    }) {
        this.isRequesting = true
        const { success, data } = await orderAPI.addOrder({
            group,
            warehouse,
            buyerName,
            owner,
            date,
            itemNote,
            mergeList,
            orders
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Thêm hoá đơn thành công!`,
                variant: 'success'
            })
            if (callback) callback(data)
        } else {
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        }
        this.isRequesting = false
    }
    @action
    async addOrders({ arrayOrders, callback }) {
        this.isRequesting = true
        // console.log(arrayOrders)
        const { success, data } = await orderAPI.addOrders({
            arrayOrders
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Tách hoá đơn thành công!`,
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
    // @action
    // async fetchAllOrders({ page = 1, itemPerPage = 10 }) {
    //     this.isRequesting = true
    //     const { success, data } = await orderAPI.getAllOrders({
    //         page,
    //         itemPerPage
    //     })
    //     if (success) {
    //         this.orders = [...this.orders, ...data.docs]
    //         this.count = data.total
    //     }
    //     this.isRequesting = false
    // }
    @action
    async fetchAllOrders() {
        this.isRequesting = true
        const { success, data } = await orderAPI.getAllOrders()
        if (success) {
            this.group = data.group[0].group
            this.orders = data.orders
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
    async updateOrder({ idOrder, data: updateData, callback }) {
        // this.isRequesting = true
        const { success, data } = await orderAPI.updateOrder({
            idOrder,
            data: updateData
        })
        if (success) {
            if (callback) return callback()
            this.rootStore.alert.show({
                message: `Cập nhật hoá đơn thành công!`,
                variant: 'success'
            })
        } else {
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        }
        // this.isRequesting = false
    }
    @action
    async mergeOrders({ ordersListId, enabled, callback }) {
        this.isRequesting = true
        const { success, data } = await orderAPI.mergeOrders({
            ordersListId,
            enabled
        })
        if (success) {
            this.rootStore.alert.show({
                message: `${enabled ? 'Huỷ hợp' : 'Hợp'} hoá đơn thành công!`,
                variant: 'success'
            })
            if (callback) callback()
            this.orders = []
            this.fetchAllOrders()
        } else
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        this.isRequesting = false
    }
    @action
    async exportOrders({ ordersListId, callback }) {
        this.isRequesting = true
        const { success, data } = await orderAPI.exportOrders({
            ordersListId
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Xuất hoá đơn thành công!`,
                variant: 'success'
            })
            if (callback) callback()
            this.orders = []
            this.fetchAllOrders()
        } else
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        this.isRequesting = false
    }
    @action
    async deleteOrders({ ordersListId, callback }) {
        this.isRequesting = true
        const { success, data } = await orderAPI.deleteOrders({
            ordersListId
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Xoá hoá đơn thành công!`,
                variant: 'success'
            })
            if (callback) callback()
            this.orders = []
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
