import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().item + path
}

const itemAPI = {
    addItem: ({ itemName, itemPrices }) =>
        axios.post(c('/add'), {
            itemName,
            itemPrices
        }),
    getAllItems: () => axios.get(c('/get-items')),
    getItem: ({ idItem }) => axios.post(c('/get-item'), { idItem }),
    updateItem: ({ idItem, itemName, itemPrices }) =>
        axios.put(c('/update'), {
            idItem,
            itemName,
            itemPrices
        }),
    deleteItems: ({ itemsListId }) => axios.post(c('/delete'), { itemsListId })
}

export default itemAPI
