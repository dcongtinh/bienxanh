import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import styles from './styles'
import RowEdit from 'components/home/order/row-edit'
import { observer } from 'mobx-react'

@observer
class UpdateExport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRows: [],
            rowsSelected: [],
            page: 0
        }
    }
    render() {
        let { classes, exported, items, wareHouses } = this.props
        let orders = exported.exportedList
        let itemName = {},
            whName = {}
        items.forEach(item => {
            itemName[item._id] = item.itemName
        })
        wareHouses.forEach(warehouse => {
            whName[warehouse._id] = {
                warehouse: warehouse.warehouse,
                warehouseName: warehouse.warehouseName,
                buyerCode: warehouse.buyerCode
            }
        })
        let ordersListId = []
        const columns = [
            'Nhóm',
            'Mã',
            'Họ tên',
            'Tên đơn vị',
            {
                name: 'Đơn hàng',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div>
                                {orders[tableMeta.rowIndex].orders.map(
                                    order => {
                                        return (
                                            <div className={classes.items}>
                                                {itemName[order.itemName]}
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        )
                    }
                }
            },
            {
                name: 'Số lượng',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div>
                                {orders[tableMeta.rowIndex].orders.map(item => {
                                    return (
                                        <div className={classes.items}>
                                            {item.itemQuantity} KG
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                }
            },
            'Ngày áp dụng',
            'Cập nhật',
            {
                name: 'Chỉnh sửa',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <RowEdit
                            noedit
                            style={{ marginLeft: 16 }}
                            updateOrder={this.props.updateOrder}
                            idOrder={orders[tableMeta.rowIndex]._id}
                            checked={orders[tableMeta.rowIndex].payStatus}
                        />
                    )
                }
            }
        ]
        let data = []
        orders.forEach(order => {
            ordersListId.push(order._id)
            let row = []
            row.push(`${order.group} ${order.mergeList.length ? '*' : ''}`)
            row.push(whName[order.warehouse].buyerCode)
            row.push(order.buyerName)
            row.push(
                `${whName[order.warehouse].warehouseName} (${
                    whName[order.warehouse].warehouse
                })`
            )
            row.push('')
            row.push('')
            row.push(moment(order.createdAt).format('DD/MM/YYYY'))
            row.push(moment(order.updatedAt).format('DD/MM/YYYY'))
            data.push(row)
        })

        let { selectedRows } = this.state
        let rowsSelected = []
        selectedRows.forEach(row => {
            rowsSelected.push(row.dataIndex)
        })
        rowsSelected.sort()
        const options = {
            rowsPerPage: 100,
            filterType: 'dropdown',
            responsive: 'scroll',
            filter: true,
            rowsSelected,
            textLabels: {
                body: {
                    noMatch: 'Không tìm thấy dữ liệu!',
                    toolTip: 'Sắp xếp'
                },
                pagination: {
                    next: 'Next Page',
                    previous: 'Previous Page',
                    rowsPerPage: 'Rows per page:',
                    displayRows: 'of'
                },
                toolbar: {
                    search: 'Tìm kiếm',
                    downloadCsv: 'Tải xuống CSV',
                    print: 'In',
                    viewColumns: 'View Columns',
                    filterTable: 'Filter Table'
                },
                filter: {
                    all: 'All',
                    title: 'FILTERS',
                    reset: 'RESET'
                },
                viewColumns: {
                    title: 'Show Columns',
                    titleAria: 'Show/Hide Table Columns'
                },
                selectedRows: {
                    text: 'dòng được chọn!',
                    delete: 'Delete',
                    deleteAria: 'Delete Selected Rows'
                }
            }
        }

        return (
            <>
                <span className={classes.spacer} />
                <MUIDataTable
                    title={'Danh sách hoá đơn'}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </>
        )
    }
}

export default withStyles(styles)(UpdateExport)
