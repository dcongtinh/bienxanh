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
}

export default ExportStore
