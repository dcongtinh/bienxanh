import axios from 'utils/axios'
import { getApi } from 'config'

const c = (path) => {
    return getApi().item + path
}

const itemAPI = {
    addItem: ({ itemName, itemUnit }) =>
        axios.post(c('/add'), {
            itemName,
            itemUnit,
        }),
    getAllItems: () => axios.get(c('/get-items')),
    getItem: ({ idItem }) => axios.post(c('/get-item'), { idItem }),
    updateItem: ({ idItem, data }) =>
        axios.put(c('/update'), {
            idItem,
            data,
        }),
    deleteItems: ({ itemsListId }) => axios.post(c('/delete'), { itemsListId }),
}

export default itemAPI
