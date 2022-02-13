import { observable, action } from 'mobx'
import unitAPI from 'api/unit.api'

class UnitStore {
    @observable isFetchingMe = true
    @observable hasFetched = false
    @observable units = []
    @observable unit = null
    @observable isRequesting = false

    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @action
    async addUnit({ unitName, callback }) {
        this.isRequesting = true
        const { success, data } = await unitAPI.addUnit({
            unitName,
        })

        if (success) {
            this.rootStore.alert.show({
                message: `Thêm đơn vị tính thành công!`,
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
    async fetchAllUnits() {
        this.isRequesting = true
        const { success, data } = await unitAPI.getAllUnits()

        if (success) {
            let units = data.units
            units.sort((a, b) => {
                if (a.unitName > b.unitName) return 1
                if (a.unitName < b.unitName) return -1
                return 0
            })
            this.units = units
        }
        this.isRequesting = false
    }
    @action
    async fetchUnit({ idUnit }) {
        this.isRequesting = true
        this.unit = null
        const { success, data } = await unitAPI.getUnit({
            idUnit,
        })
        if (success) this.unit = data.unit
        this.isRequesting = false
    }

    @action
    async updateUnit({ idUnit, data: updateData, callback }) {
        // this.isRequesting = true
        const { success, data } = await unitAPI.updateUnit({
            idUnit,
            data: updateData,
        })

        if (success) {
            if (callback) return callback()

            this.rootStore.alert.show({
                message: `Cập nhật đơn vị tính thành công!`,
                variant: 'success',
            })
            // this.fetchUnit({ idUnit })
        } else {
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error',
            })
        }
        // this.isRequesting = false
    }
    @action
    async deleteUnits({ unitsListId }) {
        this.isRequesting = true
        const { success, data } = await unitAPI.deleteUnits({
            unitsListId,
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Xoá đơn vị tính thành công!`,
                variant: 'success',
            })
            this.fetchAllUnits()
        } else
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error',
            })
        this.isRequesting = false
    }
}

export default UnitStore
