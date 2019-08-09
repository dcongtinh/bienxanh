import { observable, action } from 'mobx'
import itemAPI from 'api/item.api'

class WarehouseStore {
    @observable isFetchingMe = true
    @observable hasFetched = false
    @observable items = []
    @observable item = null
    @observable isRequesting = false

    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @action
    async addItem({ itemName, callback }) {
        this.isRequesting = true
        const { success, data } = await itemAPI.addItem({
            itemName
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Thêm hàng thành công!`,
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
    async fetchAllItems() {
        this.isRequesting = true
        const { success, data } = await itemAPI.getAllItems()
        if (success) this.items = data.items
        this.isRequesting = false
    }
    @action
    async fetchItem({ idItem }) {
        this.isRequesting = true
        this.item = null
        const { success, data } = await itemAPI.getItem({
            idItem
        })
        if (success) this.item = data.item
        this.isRequesting = false
    }

    @action
    async updateItem({ idItem, data: updateData, callback }) {
        // this.isRequesting = true
        const { success, data } = await itemAPI.updateItem({
            idItem,
            data: updateData
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Cập nhật hàng  thành công!`,
                variant: 'success'
            })
            if (callback) callback()
            this.fetchItem({ idItem })
        } else {
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        }
        // this.isRequesting = false
    }
    @action
    async deleteItems({ itemsListId }) {
        this.isRequesting = true
        const { success, data } = await itemAPI.deleteItems({
            itemsListId
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Xoá hàng thành công!`,
                variant: 'success'
            })
            this.fetchAllItems()
        } else
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        this.isRequesting = false
    }
}

export default WarehouseStore
