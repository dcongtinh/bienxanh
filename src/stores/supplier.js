import { observable, action } from 'mobx'
import supplierAPI from 'api/supplier.api'

class SupplierStore {
    @observable isFetchingMe = true
    @observable hasFetched = false
    @observable suppliers = []
    @observable supplier = null
    @observable isRequesting = false

    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @action
    async addSupplier({
        supplierCode,
        supplierName,
        supplierIdNo,
        supplierAddress,
        supplierNote,
        supplierItems,
        callback,
    }) {
        this.isRequesting = true
        const { success, data } = await supplierAPI.addSupplier({
            supplierCode,
            supplierName,
            supplierIdNo,
            supplierAddress,
            supplierNote,
            supplierItems,
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Thêm nhà cung cấp thành công!`,
                variant: 'success',
            })
            if (callback) callback()
        } else {
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error',
            })
        }
        this.isRequesting = false
    }
    @action
    async fetchAllSuppliers() {
        this.isRequesting = true
        const { success, data } = await supplierAPI.getAllSuppliers()
        if (success) this.suppliers = data.suppliers
        this.isRequesting = false
    }
    @action
    async fetchSupplier({ idSupplier }) {
        this.isRequesting = true
        this.supplier = null
        const { success, data } = await supplierAPI.getSupplier({
            idSupplier,
        })
        if (success) this.supplier = data.supplier
        this.isRequesting = false
    }

    @action
    async updateSupplier({ idSupplier, data: updateData, callback }) {
        this.isRequesting = true
        const { success, data } = await supplierAPI.updateSupplier({
            idSupplier,
            data: updateData,
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Cập nhật nhà cung cấp thành công!`,
                variant: 'success',
            })
            if (callback) callback()
        } else {
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error',
            })
        }
        this.isRequesting = false
    }
    @action
    async deleteSuppliers({ suppliersListId }) {
        this.isRequesting = true
        const { success, data } = await supplierAPI.deleteSuppliers({
            suppliersListId,
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Xoá hàng thành công!`,
                variant: 'success',
            })
            this.fetchAllSuppliers()
        } else
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error',
            })
        this.isRequesting = false
    }
}

export default SupplierStore
