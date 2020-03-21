import { observable, action } from 'mobx'
import wareHouseAPI from 'api/warehouse.api'

class WarehouseStore {
    @observable isFetchingMe = true
    @observable hasFetched = false
    @observable wareHouses = []
    @observable wareHouse = null
    @observable isRequesting = false

    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @action
    async addWarehouse({
        warehouse,
        warehouseName,
        buyerCode,
        buyerAddress,
        buyerArea,
        buyerLegalName,
        buyerTaxCode,
        callback
    }) {
        this.isRequesting = true
        const { success, data } = await wareHouseAPI.addWarehouse({
            warehouse,
            warehouseName,
            buyerCode,
            buyerAddress,
            buyerArea,
            buyerLegalName,
            buyerTaxCode
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Thêm kho thành công!`,
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
    async fetchAllWarehouses(query) {
        this.isRequesting = true
        const { success, data } = await wareHouseAPI.getAllWarehouses(query)
        if (success) {
            this.wareHouses = data.wareHouses
            this.wareHousesTotal = data.count
        }
        this.isRequesting = false
    }
    @action
    async fetchWarehouse({ idWarehouse }) {
        this.isRequesting = true
        this.wareHouse = null
        const { success, data } = await wareHouseAPI.getWarehouse({
            idWarehouse
        })
        if (success) this.wareHouse = data.wareHouse
        this.isRequesting = false
    }

    @action
    async updateWarehouse({
        idWarehouse,
        warehouse,
        warehouseName,
        buyerCode,
        buyerAddress,
        buyerArea,
        buyerLegalName,
        buyerTaxCode,
        callback
    }) {
        this.isRequesting = true
        const { success, data } = await wareHouseAPI.updateWarehouse({
            idWarehouse,
            warehouse,
            warehouseName,
            buyerCode,
            buyerAddress,
            buyerArea,
            buyerLegalName,
            buyerTaxCode
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Cập nhật kho thành công!`,
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
    async deleteWareHouses({ wareHousesListId }) {
        this.isRequesting = true
        const { success, data } = await wareHouseAPI.deleteWareHouses({
            wareHousesListId
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Xoá tài khoản thành công!`,
                variant: 'success'
            })
            this.fetchAllWarehouses()
        } else
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        this.isRequesting = false
    }
}

export default WarehouseStore
