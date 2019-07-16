import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().item + path
}

const itemAPI = {
    addItem: ({ itemNameCode, itemName }) =>
        axios.post(c('/add'), {
            itemNameCode,
            itemName
        }),
    getAllItems: () => axios.get(c('/get-items')),
    getItem: ({ idItem }) => axios.post(c('/get-item'), { idItem }),
    updateItem: ({ idItem, itemNameCode, itemName }) =>
        axios.put(c('/update'), {
            idItem,
            itemNameCode,
            itemName
        }),
    deleteItems: ({ itemsListId }) => axios.post(c('/delete'), { itemsListId })
}

export default itemAPI
