import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().wareHouse + path
}

const wareHouseAPI = {
    addWarehouse: ({
        warehouse,
        buyerCode,
        buyerAddress,
        buyerLegalName,
        buyerTaxCode
    }) =>
        axios.post(c('/add'), {
            warehouse,
            buyerCode,
            buyerAddress,
            buyerLegalName,
            buyerTaxCode
        }),
    getAllWarehouses: () => axios.get(c('/get-warehouses')),
    getWarehouse: ({ idWarehouse }) =>
        axios.post(c('/get-warehouse'), { idWarehouse }),
    updateWarehouse: ({
        idWarehouse,
        warehouse,
        buyerCode,
        buyerAddress,
        buyerLegalName,
        buyerTaxCode
    }) =>
        axios.put(c('/update'), {
            idWarehouse,
            warehouse,
            buyerCode,
            buyerAddress,
            buyerLegalName,
            buyerTaxCode
        })
}

export default wareHouseAPI
