import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().export + path
}

const exportAPI = {
    getAllExports: () => axios.get(c('/get-exports')),
    getExport: ({ idExported }) => axios.post(c('/get-export'), { idExported })
}

export default exportAPI
