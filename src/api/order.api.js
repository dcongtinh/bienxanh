import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().order + path
}

const orderAPI = {
    addOrder: ({ warehouse, items, owner, createdAt, mergeList }) =>
        axios.post(c('/add'), {
            warehouse,
            items,
            owner,
            createdAt,
            mergeList
        }),
    // getAllOrders: ({ page = 1, itemPerPage = 10 }) =>
    //     axios.get(c(`/get-orders?page=${page}&itemPerPage=${itemPerPage}`)),
    getAllOrders: () => axios.get(c(`/get-orders`)),
    getOrder: ({ idOrder }) => axios.post(c('/get-order'), { idOrder }),
    updateOrder: ({ idOrder, data }) =>
        axios.put(c('/update'), {
            idOrder,
            data
        }),
    mergeOrders: ({ ordersListId, enabled }) =>
        axios.put(c('/merge'), { ordersListId, enabled }),
    deleteOrders: ({ ordersListId }) =>
        axios.post(c('/delete'), { ordersListId })
}

export default orderAPI
