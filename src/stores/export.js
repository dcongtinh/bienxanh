import { observable, action } from 'mobx'
import exportAPI from 'api/export.api'

class ExportStore {
    @observable isFetchingMe = true
    @observable hasFetched = false
    @observable exports = []
    @observable exportedListId = []
    @observable exported = null
    @observable isRequesting = false

    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @action
    async fetchAllExports() {
        this.isRequesting = true
        this.exports = []
        this.exportedListId = []
        const { success, data } = await exportAPI.getAllExports()
        if (success) {
            let exportedListId = []
            data.exportedList.forEach(element => {
                let array = []
                element.exportedList.forEach(x => {
                    array.push(x._id)
                })
                exportedListId.push(array)
            })
            this.exports = data.exportedList
            this.exportedListId = exportedListId
        }
        this.isRequesting = false
    }
    @action
    async fetchExport({ idExported }) {
        this.isRequesting = true
        this.exported = null
        const { success, data } = await exportAPI.getExport({
            idExported
        })
        if (success) this.exported = data.exported
        this.isRequesting = false
    }
    @action
    async setExport({ idExported, exportedList, callback }) {
        this.isRequesting = true
        const { success, data } = await exportAPI.setExport({
            idExported,
            exportedList
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Khôi phục hoá đơn thành công!`,
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
    async exportReport({ exportIdList, callback }) {
        this.isRequesting = true
        const { success, data } = await exportAPI.exportReport({
            exportIdList
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Xuất báo cáo thành công!`,
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
    async deleteExports({ exportedList, exportsList, callback }) {
        this.isRequesting = true
        const { success, data } = await exportAPI.deleteExports({
            exportedList,
            exportsList
        })
        if (success) {
            this.rootStore.alert.show({
                message: `Xoá hoá đơn đã xuất thành công!`,
                variant: 'success'
            })
            if (callback) callback()
            this.fetchAllExports()
        } else
            this.rootStore.alert.show({
                message: data.message,
                variant: 'error'
            })
        this.isRequesting = false
    }
}

export default ExportStore
