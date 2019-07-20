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
    // @action
    // async fetchAllItems() {
    //     this.isRequesting = true
    //     const { success, data } = await orderAPI.getAllItems()
    //     if (success) this.items = data.items
    //     this.isRequesting = false
    // }
    // @action
    // async fetchItem({ idItem }) {
    //     this.isRequesting = true
    //     this.item = null
    //     const { success, data } = await orderAPI.getItem({
    //         idItem
    //     })
    //     if (success) this.item = data.item
    //     this.isRequesting = false
    // }

    // @action
    // async updateItem({ idItem, itemNameCode, itemName, callback }) {
    //     this.isRequesting = true
    //     const { success, data } = await orderAPI.updateItem({
    //         idItem,
    //         itemNameCode,
    //         itemName
    //     })

    //     if (success) {
    //         this.rootStore.alert.show({
    //             message: `Cập nhật hàng  thành công!`,
    //             variant: 'success'
    //         })
    //         if (callback) callback()
    //     } else {
    //         this.rootStore.alert.show({
    //             message: data.message,
    //             variant: 'error'
    //         })
    //     }
    //     this.isRequesting = false
    // }
    // @action
    // async deleteItems({ itemsListId }) {
    //     this.isRequesting = true
    //     const { success, data } = await orderAPI.deleteItems({
    //         itemsListId
    //     })
    //     if (success) {
    //         this.rootStore.alert.show({
    //             message: `Xoá hàng thành công!`,
    //             variant: 'success'
    //         })
    //         this.fetchAllItems()
    //     } else
    //         this.rootStore.alert.show({
    //             message: data.message,
    //             variant: 'error'
    //         })
    //     this.isRequesting = false
    // }
}

export default OrderStore
