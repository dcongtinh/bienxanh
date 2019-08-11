import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().export + path
}

const exportAPI = {
    getAllExports: () => axios.get(c('/get-exports')),
    getExport: ({ idExported }) => axios.post(c('/get-export'), { idExported }),
    setExport: ({ idExported, exportedList }) =>
        axios.put(c('/set-export'), { idExported, exportedList })
}

export default exportAPI
