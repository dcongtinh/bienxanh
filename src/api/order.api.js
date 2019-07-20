import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().order + path
}

const orderAPI = {
    addOrder: ({ warehouse, items, owner }) =>
        axios.post(c('/add'), { warehouse, items, owner }),
    // getAllItems: () => axios.get(c('/get-items')),
    getOrder: ({ idOrder }) => axios.post(c('/get-order'), { idOrder }),
    updateOrder: ({ idOrder, warehouse, items }) =>
        axios.put(c('/update'), { idOrder, warehouse, items })
    // deleteItems: ({ itemsListId }) => axios.post(c('/delete'), { itemsListId })
}

export default orderAPI
