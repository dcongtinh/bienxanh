import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().supplier + path
}

const supplierAPI = {
    addSupplier: ({
        supplierCode,
        supplierName,
        supplierIdNo,
        supplierAddress,
        supplierNote,
        supplierItems
    }) =>
        axios.post(c('/add'), {
            supplierCode,
            supplierName,
            supplierIdNo,
            supplierAddress,
            supplierNote,
            supplierItems
        }),
    getAllSuppliers: () => axios.get(c('/get-suppliers')),
    getSupplier: ({ idSupplier }) =>
        axios.post(c('/get-supplier'), { idSupplier }),
    updateSupplier: ({ idSupplier, data }) =>
        axios.put(c('/update'), {
            idSupplier,
            data
        }),
    deleteSuppliers: ({ suppliersListId }) =>
        axios.post(c('/delete'), { suppliersListId })
}

export default supplierAPI
