import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().order + path
}

const orderAPI = {
    addOrder: ({ warehouse, items, owner }) =>
        axios.post(c('/add'), { warehouse, items, owner }),
    getAllOrders: () => axios.get(c('/get-orders')),
    getOrder: ({ idOrder }) => axios.post(c('/get-order'), { idOrder }),
    updateOrder: ({ idOrder, warehouse, buyerName, items }) =>
        axios.put(c('/update'), { idOrder, warehouse, buyerName, items }),
    deleteOrders: ({ ordersListId }) =>
        axios.post(c('/delete'), { ordersListId })
}

export default orderAPI
