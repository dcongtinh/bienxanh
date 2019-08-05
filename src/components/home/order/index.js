import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
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
            unMerge1: false,
            page: 0
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
        let { classes, orders, me } = this.props
        const columns = [
            'Nhóm',
            'Mã',
            {
                name: 'Họ tên',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <RowItem
                            order={orders[tableMeta.rowIndex]}
                            value={value}
                            tableMeta={tableMeta}
                            updateValue={updateValue}
                            updateOrder={this.props.updateOrder}
                            idOrder={orders[tableMeta.rowIndex]._id}
                        />
                    )
                }
            },
            'Tên đơn vị',
            {
                name: 'Đơn hàng',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div>
                                {orders[tableMeta.rowIndex].items.map(item => {
                                    return (
                                        <div className={classes.items}>
                                            {item.itemName.itemName}
                                        </div>
                                    )
                                })}
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
                                {orders[tableMeta.rowIndex].items.map(item => {
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
                            style={{ marginLeft: 16 }}
                            history={this.props.history}
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
            let row = []
            row.push(`${order.group} ${order.mergeList.length ? '*' : ''}`)
            row.push(order.warehouse.buyerCode)
            row.push(order.buyerName)
            row.push(
                `${order.warehouse.warehouseName} (${
                    order.warehouse.warehouse
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
                    let index = rowsSelected[i]
                    // let date1 = moment(orders[index - 1].createdAt).format(
                    //     'DD/MM/YYYY'
                    // )
                    // let date2 = moment(orders[index].createdAt).format(
                    //     'DD/MM/YYYY'
                    // )
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
                    orders[rowsSelected[0]].items.length > 1
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
                    <DownloadExcel
                        className={classes.exportButton}
                        size="small"
                        variant="outlined"
                        orders={orders}
                    />
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
                <MUIDataTable
                    title={'Danh sách hoá đơn'}
                    data={data}
                    columns={columns}
                    options={options}
                />
                <ConfirmDialog
                    open={openConfirmUnMerge}
                    title="Bạn có chắc muốn tách hoá đơn?"
                    cancelLabel="Huỷ"
                    okLabel="Đồng ý"
                    onHide={this.handleClose}
                    onOK={() => {
                        let ordersListId = []
                        let mergeList = []
                        this.state.rowsSelected.forEach(index => {
                            ordersListId.push(orders[index]._id)
                            mergeList = mergeList.concat(
                                orders[index].mergeList
                            )
                        })
                        if (unMerge1) {
                            var itemsList = []
                            let ordersFirst = orders[rowsSelected[0]]
                            let warehouse = ordersFirst.warehouse._id
                            let items = ordersFirst.items
                            let createdAt = ordersFirst.createdAt
                            items.forEach(item => {
                                itemsList.push(item)
                            })
                            this.props.deleteOrders({
                                ordersListId,
                                callback: () => {
                                    itemsList.forEach(item => {
                                        this.props.addOrder({
                                            warehouse,
                                            items: [item],
                                            owner: me._id,
                                            createdAt
                                        })
                                    })
                                    this.props.fetchAllOrders()
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
                        let warehouse = ordersFirst.warehouse._id
                        let items = ordersFirst.items
                        let createdAt = ordersFirst.createdAt
                        let mergeList = [] // list _id of orders was merged
                        if (ordersFirst.mergeList) {
                            if (ordersFirst.mergeList.length)
                                mergeList = ordersFirst.mergeList
                            else mergeList.push(ordersFirst._id)
                        }
                        for (let i = 1; i < length; ++i) {
                            let index = rowsSelected[i]
                            items = items.concat(orders[index].items)
                            if (orders[index].mergeList.length)
                                mergeList = mergeList.concat(
                                    orders[index].mergeList
                                )
                            else mergeList.push(orders[index]._id)
                        }
                        let marks = {},
                            _items = []
                        items.forEach(item => {
                            if (!marks[item.itemName._id]) {
                                let _item = item
                                _item.itemName = _item.itemName._id
                                marks[_item.itemName] = true
                                _items.push(_item)
                            } else {
                                _items.forEach(_item => {
                                    if (_item.itemName === item.itemName._id) {
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
                                    warehouse,
                                    items: _items,
                                    owner: me._id,
                                    createdAt,
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
