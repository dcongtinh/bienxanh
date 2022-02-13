import axios from 'utils/axios'
import { getApi } from 'config'

const c = (path) => {
    return getApi().unit + path
}

const unitAPI = {
    addUnit: ({ unitName }) =>
        axios.post(c('/add'), {
            unitName,
        }),
    getAllUnits: () => axios.get(c('/get-units')),
    getUnit: ({ idUnit }) => axios.post(c('/get-unit'), { idUnit }),
    updateUnit: ({ idUnit, data }) =>
        axios.put(c('/update'), {
            idUnit,
            data,
        }),
    deleteUnits: ({ unitsListId }) => axios.post(c('/delete'), { unitsListId }),
}

export default unitAPI
