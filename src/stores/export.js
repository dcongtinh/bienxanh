import { observable, action } from 'mobx'
import exportAPI from 'api/export.api'

class ExportStore {
    @observable isFetchingMe = true
    @observable hasFetched = false
    @observable exports = []
    @observable exported = null
    @observable isRequesting = false

    constructor(rootStore) {
        this.rootStore = rootStore
    }
    @action
    async fetchAllExports() {
        this.isRequesting = true
        const { success, data } = await exportAPI.getAllExports()
        if (success) this.exports = data.exportedList
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
}

export default ExportStore
