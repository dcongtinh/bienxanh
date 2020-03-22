import axios from 'utils/axios'
import { getApi } from 'config'

const c = path => {
    return getApi().wareHouse + path
}

const wareHouseAPI = {
    addWarehouse: ({
        warehouse,
        warehouseName,
        buyerCode,
        buyerAddress,
        buyerArea,
        buyerLegalName,
        buyerTaxCode
    }) =>
        axios.post(c('/add'), {
            warehouse,
            warehouseName,
            buyerCode,
            buyerAddress,
            buyerArea,
            buyerLegalName,
            buyerTaxCode
        }),
    getAllWarehouses: ({
        page = 0,
        itemPerPage = 100,
        column = '',
        order = '',
        searchText = '',
        filters = []
    }) =>
        axios.get(
            c(
                `/get-warehouses?page=${page}&itemPerPage=${itemPerPage}&column=${column}&order=${order}&searchText=${searchText}&filters=${filters}`
            )
        ),
    // getAllWarehouses: () => axios.get(c('/get-warehouses')),
    getWarehouse: ({ idWarehouse }) =>
        axios.post(c('/get-warehouse'), { idWarehouse }),
    updateWarehouse: ({
        idWarehouse,
        warehouse,
        warehouseName,
        buyerCode,
        buyerAddress,
        buyerArea,
        buyerLegalName,
        buyerTaxCode
    }) =>
        axios.put(c('/update'), {
            idWarehouse,
            warehouse,
            warehouseName,
            buyerCode,
            buyerAddress,
            buyerArea,
            buyerLegalName,
            buyerTaxCode
        }),
    deleteWareHouses: ({ wareHousesListId }) =>
        axios.post(c('/delete'), { wareHousesListId })
}

export default wareHouseAPI
