import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import MergeTypeIcon from '@material-ui/icons/MergeType'
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
import { observer } from 'mobx-react'

@observer
class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openConfirm: false,
            selectedRows: [],
            rowsSelected: [],
            page: 0
        }
    }
    handleClose = () => {
        this.setState({ openConfirm: false })
    }
    render() {
        let { orders, classes } = this.props
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
            'Ngày áp dụng',
            'Cập nhật',
            {
                name: 'Chỉnh sửa',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <RowEdit
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
            row.push(order.group)
            row.push(order.warehouse.buyerCode)
            row.push(order.buyerName)
            row.push(
                `${order.warehouse.warehouseName} (${
                    order.warehouse.warehouse
                })`
            )
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
            customToolbarSelect: selectedRows => (
                <div>
                    <IconButton
                        onClick={() => {
                            let rowsSelected = []
                            selectedRows.data.forEach(row => {
                                rowsSelected.push(row.dataIndex)
                            })
                            rowsSelected.sort()
                            this.setState({
                                openConfirm: true,
                                selectedRows: selectedRows.data,
                                rowsSelected
                            })
                        }}>
                        <MergeTypeIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            let rowsSelected = []
                            selectedRows.data.forEach(row => {
                                rowsSelected.push(row.dataIndex)
                            })
                            rowsSelected.sort()
                            this.setState({
                                openConfirm: true,
                                selectedRows: selectedRows.data,
                                rowsSelected
                            })
                        }}>
                        <RemoveCircleIcon />
                    </IconButton>
                </div>
            )
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
                    open={this.state.openConfirm}
                    title="Bạn có chắc muốn xoá hoá đơn?"
                    cancelLabel="Huỷ"
                    okLabel="Xoá"
                    onHide={this.handleClose}
                    onOK={() => {
                        let ordersListId = []
                        this.state.rowsSelected.forEach(index => {
                            ordersListId.push(orders[index]._id)
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
