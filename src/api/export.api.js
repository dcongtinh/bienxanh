import axios from 'utils/axios'
import { getApi } from 'config'

const c = (path) => {
    return getApi().export + path
}

const exportAPI = {
    getAllExports: ({ page = 0, itemPerPage = 10, column = '', order = '' }) =>
        axios.get(
            c(
                `/get-exports?page=${page}&itemPerPage=${itemPerPage}&column=${column}&order=${order}`
            )
        ),
    getExport: ({ idExported }) => axios.post(c('/get-export'), { idExported }),
    setExport: ({ idExported, exportedList }) =>
        axios.put(c('/set-export'), { idExported, exportedList }),
    exportReport: ({ exportIdList }) =>
        axios.put(c('/export-report'), { exportIdList }),
    deleteExports: ({ exportedList, exportsList }) =>
        axios.post(c('/delete'), { exportedList, exportsList }),
}

export default exportAPI
