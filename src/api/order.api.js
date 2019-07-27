import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().order + path
}

const orderAPI = {
    addOrder: ({ warehouse, items, owner }) =>
        axios.post(c('/add'), { warehouse, items, owner }),
    getAllOrders: ({ page = 1, itemPerPage = 10 }) =>
        axios.get(c(`/get-orders?page=${page}&itemPerPage=${itemPerPage}`)),
    getOrder: ({ idOrder }) => axios.post(c('/get-order'), { idOrder }),
    updateOrder: ({ idOrder, warehouse, buyerName, items, payStatus }) =>
        axios.put(c('/update'), {
            idOrder,
            warehouse,
            buyerName,
            items,
            payStatus
        }),
    deleteOrders: ({ ordersListId }) =>
        axios.post(c('/delete'), { ordersListId })
}

export default orderAPI
