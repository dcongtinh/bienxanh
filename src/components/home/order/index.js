import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
// import Editable from 'components/Editable'
import MergeTypeIcon from '@material-ui/icons/MergeType'
import UndoIcon from '@material-ui/icons/Undo'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import ConfirmDialog from 'components/ConfirmDialog'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import DownloadExcel from 'components/DownloadExcel'
import moment from 'moment'
import styles from './styles'
import RowItem from './row-item'
import RowEdit from './row-edit'
import Tooltip from '@material-ui/core/Tooltip'
import { observer } from 'mobx-react'

@observer
class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openConfirmDelete: false,
            openConfirmMerge: false,
            openConfirmUnMerge: false,
            selectedRows: [],
            rowsSelected: [],
            unMerge1: false
        }
    }
    handleClose = () => {
        this.setState({
            openConfirmDelete: false,
            openConfirmMerge: false,
            openConfirmUnMerge: false,
            unMerge1: false
        })
    }
    render() {
        let {
            openConfirmDelete,
            openConfirmMerge,
            openConfirmUnMerge,
            unMerge1
        } = this.state
        let { classes, orders, me, items } = this.props
        let itemName = {}
        items.forEach(item => {
            itemName[item._id] = item.itemName
        })
        let ordersListId = []
        // const columns = [
        //     {
        //         title: 'Nhóm',
        //         field: 'group',
        //         headerStyle: {
        //             marginBottom: 4
        //         },
        //         render: rowData => {
        //             // console.log(rowData)
        //             // return <div>{rowData.group}</div>
        //             return (
        //                 <RowItem
        //                     order={orders[tableMeta.rowIndex]}
        //                     value={value}
        //                     tableMeta={tableMeta}
        //                     updateValue={updateValue}
        //                     updateOrder={this.props.updateOrder}
        //                     callback={this.props.fetchAllOrders}
        //                     idOrder={orders[tableMeta.rowIndex]._id}
        //                 />
        //             )
        //         }
        //     }
        // ]
        const columns = [
            {
                name: 'Nhóm',
                options: {
                    filter: false
                }
            },
            'Mã',
            {
                name: 'Họ tên',
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let idx =
                            typeof tableMeta.rowData !== 'string'
                                ? tableMeta.rowData[8]
                                : 0
                        return (
                            <RowItem
                                order={orders[idx]}
                                value={value}
                                tableMeta={tableMeta}
                                updateValue={updateValue}
                                updateOrder={this.props.updateOrder}
                            />
                        )
                    }
                }
            },
            'Tên đơn vị',
            {
                name: 'Đơn hàng',
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let itemList = value.split(';')
                        return (
                            <div>
                                {itemList.map(item => {
                                    if (item)
                                        return (
                                            <div className={classes.items}>
                                                {item}
                                            </div>
                                        )
                                    return null
                                })}
                            </div>
                        )
                    }
                }
            },
            {
                name: 'Số lượng',
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let quantityList = value.split(';')
                        return (
                            <div>
                                {quantityList.map(item => {
                                    if (item)
                                        return (
                                            <div className={classes.items}>
                                                {item}
                                            </div>
                                        )
                                    return null
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
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <RowEdit
                            style={{ marginLeft: 16 }}
                            history={this.props.history}
                            updateOrder={this.props.updateOrder}
                            idOrder={orders[value]._id}
                            checked={orders[value].payStatus}
                        />
                    )
                }
            }
        ]

        let data = []
        orders.forEach((order, index) => {
            ordersListId.push(order._id)
            let row = []
            row.push(`${order.group} ${order.mergeList.length ? '*' : ''}`)
            row.push(order.warehouse.buyerCode)
            row.push(order.buyerName)
            row.push(
                `${order.warehouse.warehouseName} (${order.warehouse.warehouse})`
            )
            let itemList = '',
                quantityList = ''
            order.orders.forEach(item => {
                itemList += itemName[item.itemName] + ';'
                quantityList += item.itemQuantity + ' KG;'
            })
            row.push(itemList)
            row.push(quantityList)
            row.push(moment(order.date).format('DD/MM/YYYY'))
            row.push(moment(order.updatedAt).format('DD/MM/YYYY'))
            row.push(index)
            data.push(row)
        })

        // orders.forEach(order => {
        //     ordersListId.push(order._id)
        //     let row = {}
        //     row.group = `${order.group} ${order.mergeList.length ? '*' : ''}`
        // let row = []
        // row.push({
        //     group: `${order.group} ${order.mergeList.length ? '*' : ''}`
        // })
        // row.push({ buyerCode: order.warehouse.buyerCode })
        // row.push({ buyerName: order.buyerName })
        // row.push({
        //     warehouse: `${order.warehouse.warehouseName} (${
        //         order.warehouse.warehouse
        //     })`
        // })
        // row.push({ orders: 0 })
        // row.push({ itemQuantity: 0 })
        // row.push({ createdAt: moment(order.date).format('DD/MM/YYYY') })
        // row.push({
        //     updatedAy: moment(order.updatedAt).format('DD/MM/YYYY')
        // })
        //     data.push(row)
        // })

        let { selectedRows } = this.state
        let rowsSelected = []
        selectedRows.forEach(row => {
            rowsSelected.push(row.dataIndex)
        })
        // console.log(data)
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
                    viewColumns: 'Xem cột',
                    filterTable: 'Lọc bảng'
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
            },
            customToolbarSelect: selectedRows => {
                let rowsSelected = []
                selectedRows.data.forEach(row => {
                    rowsSelected.push(row.dataIndex)
                })
                rowsSelected.sort()
                let length = rowsSelected.length
                let merge = length > 1
                for (let i = 1; i < length; ++i) {
                    merge &=
                        orders[rowsSelected[i - 1]].warehouse.buyerCode ===
                        orders[rowsSelected[i]].warehouse.buyerCode
                    if (!merge) break
                }
                let unMerge =
                    length === 1 && orders[rowsSelected[0]].mergeList.length
                let unMerge1 =
                    length === 1 &&
                    !orders[rowsSelected[0]].mergeList.length &&
                    orders[rowsSelected[0]].orders.length > 1
                return (
                    <div>
                        {unMerge || unMerge1 ? (
                            <Tooltip title="Tách">
                                <IconButton
                                    onClick={() => {
                                        this.setState({
                                            openConfirmUnMerge: true,
                                            selectedRows: selectedRows.data,
                                            rowsSelected,
                                            unMerge1
                                        })
                                    }}>
                                    <UndoIcon />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        {merge ? (
                            <Tooltip title="Hợp">
                                <IconButton
                                    onClick={() => {
                                        this.setState({
                                            openConfirmMerge: true,
                                            selectedRows: selectedRows.data,
                                            rowsSelected
                                        })
                                    }}>
                                    <MergeTypeIcon />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        <Tooltip title="Xoá">
                            <IconButton
                                onClick={() => {
                                    this.setState({
                                        openConfirmDelete: true,
                                        selectedRows: selectedRows.data,
                                        rowsSelected
                                    })
                                }}>
                                <RemoveCircleIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            }
        }

        return (
            <>
                <span className={classes.spacer} />
                <div className={classes.row}>
                    {orders.length ? (
                        <DownloadExcel
                            className={classes.exportButton}
                            size="small"
                            variant="outlined"
                            orders={orders}
                            items={items}
                            name={itemName}
                            onClick={() => {
                                this.props.exportOrders({ ordersListId })
                            }}
                        />
                    ) : null}
                    <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                        onClick={() => {
                            this.props.history.push('/dashboard/order/add')
                        }}>
                        <AddIcon className={classes.addIcon} />
                        Add
                    </Button>
                </div>
                {/* <Editable data={data} columns={columns} /> */}
                <MUIDataTable data={data} columns={columns} options={options} />
                <ConfirmDialog
                    open={openConfirmUnMerge}
                    title="Bạn có chắc muốn tách hoá đơn?"
                    cancelLabel="Huỷ"
                    okLabel="Đồng ý"
                    onHide={this.handleClose}
                    onOK={() => {
                        let ordersListId = [],
                            mergeList = []
                        rowsSelected.forEach(index => {
                            ordersListId.push(orders[index]._id)
                            mergeList = mergeList.concat(
                                orders[index].mergeList
                            )
                        })
                        if (unMerge1) {
                            let ordersFirst = orders[rowsSelected[0]]
                            let arrayOrders = []

                            let group = this.props.count
                            let {
                                warehouse,
                                buyerName,
                                date,
                                owner
                            } = ordersFirst
                            ordersFirst.orders.forEach(order => {
                                arrayOrders.push({
                                    group: ++group,
                                    warehouse: warehouse._id,
                                    buyerName,
                                    orders: [order],
                                    date,
                                    owner: owner._id
                                })
                            })
                            this.props.deleteOrders({
                                ordersListId,
                                callback: () => {
                                    this.props.addOrders({
                                        arrayOrders,
                                        callback: () =>
                                            this.props.fetchAllOrders()
                                    })
                                }
                            })
                        } else {
                            this.props.deleteOrders({
                                ordersListId,
                                callback: () =>
                                    this.props.mergeOrders({
                                        ordersListId: mergeList,
                                        enabled: true
                                    })
                            })
                        }

                        this.handleClose()
                        this.setState({ selectedRows: [] })
                    }}
                />
                <ConfirmDialog
                    open={openConfirmMerge}
                    title="Bạn có chắc muốn hợp các hoá đơn?"
                    cancelLabel="Huỷ"
                    okLabel="Đồng ý"
                    onHide={this.handleClose}
                    onOK={() => {
                        let ordersListId = []
                        let { rowsSelected } = this.state
                        rowsSelected.forEach(index => {
                            ordersListId.push(orders[index]._id)
                        })

                        let length = rowsSelected.length
                        let ordersFirst = orders[rowsSelected[0]]
                        let { group, date } = ordersFirst
                        let _orders = ordersFirst.orders
                        let warehouse = ordersFirst.warehouse._id
                        let mergeList = [] // list _id of orders was merged
                        mergeList.push(ordersFirst._id)

                        for (let i = 1; i < length; ++i) {
                            let index = rowsSelected[i]
                            _orders = _orders.concat(orders[index].orders)
                            mergeList.push(orders[index]._id)
                            group = Math.min(group, orders[index].group)
                        }
                        let marks = {},
                            _orderList = []
                        _orders.forEach(item => {
                            if (!marks[item.itemName]) {
                                marks[item.itemName] = true
                                delete item._id
                                _orderList.push(item)
                            } else {
                                _orderList.forEach(_item => {
                                    if (_item.itemName === item.itemName) {
                                        _item.itemQuantity += item.itemQuantity
                                    }
                                })
                            }
                        })
                        this.props.mergeOrders({
                            ordersListId,
                            enabled: false,
                            callback: () =>
                                this.props.addOrder({
                                    group,
                                    warehouse,
                                    orders: _orderList,
                                    owner: me._id,
                                    date,
                                    mergeList,
                                    callback: () => this.props.fetchAllOrders()
                                })
                        })

                        this.handleClose()
                        this.setState({ selectedRows: [] })
                    }}
                />
                <ConfirmDialog
                    open={openConfirmDelete}
                    title="Bạn có chắc muốn xoá hoá đơn?"
                    cancelLabel="Huỷ"
                    okLabel="Xoá"
                    onHide={this.handleClose}
                    onOK={() => {
                        let ordersListId = []
                        this.state.rowsSelected.forEach(index => {
                            ordersListId.push(orders[index]._id)
                            if (orders[index].mergeList.length)
                                ordersListId = ordersListId.concat(
                                    orders[index].mergeList
                                )
                        })
                        this.props.deleteOrders({ ordersListId })
                        this.handleClose()
                        this.setState({ selectedRows: [] })
                    }}
                />
            </>
        )
    }
}

export default withStyles(styles)(Order)
