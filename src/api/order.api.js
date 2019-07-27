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
    updateOrder: ({ idOrder, data }) =>
        axios.put(c('/update'), {
            idOrder,
            data
        }),
    deleteOrders: ({ ordersListId }) =>
        axios.post(c('/delete'), { ordersListId })
}

export default orderAPI
