import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import IconButton from '@material-ui/core/IconButton'
import { CircularProgress } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ConfirmDialog from 'components/ConfirmDialog'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import DownloadExcel from 'components/DownloadExcel'
import moment from 'moment'
import styles from './styles'
import RowItem from './row-item'
import { observer } from 'mobx-react'

@observer
class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openConfirm: false,
            selectedRows: [],
            rowsSelected: [],
            rowsPerPage: 10,
            page: 0
        }
    }
    handleClose = () => {
        this.setState({ openConfirm: false })
    }
    handleChangePage = currentPage => {
        if (currentPage <= this.state.page) {
            return
        }
        this.setState(
            {
                page: currentPage
            },
            () => {
                this.props.fetchAllOrders({
                    page: currentPage + 1,
                    itemPerPage: this.state.rowsPerPage
                })
            }
        )
    }
    handleChangeRowPerPage = numberOfRows => {
        this.setState({
            rowsPerPage: numberOfRows
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log('nextProps', JSON.parse(JSON.stringify(nextProps.orders)))
    }
    render() {
        let { orders, count, classes } = this.props
        const columns = [
            'Nhóm hoá đơn',
            'Mã khách hàng',
            {
                name: 'Họ tên',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <RowItem
                            value={value}
                            tableMeta={tableMeta}
                            updateValue={updateValue}
                        />
                    )
                }
            },
            'Tên đơn vị',
            'Ngày tạo',
            'Cập nhật',
            {
                name: 'Chỉnh sửa',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>Edit</div>
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
            row.push(moment(order.createdAt).format('HH:mm DD/MM/YYYY'))
            row.push(moment(order.updatedAt).format('HH:mm DD/MM/YYYY'))
            data.push(row)
        })

        let { selectedRows } = this.state
        let rowsSelected = []
        selectedRows.forEach(row => {
            rowsSelected.push(row.dataIndex)
        })
        rowsSelected.sort()
        const options = {
            // page: this.state.page,
            count: count,
            filterType: 'dropdown',
            responsive: 'scroll',
            filter: true,
            rowsSelected,
            // selectableRowsOnClick: true
            onChangePage: this.handleChangePage,
            onChangeRowsPerPage: this.handleChangeRowPerPage,
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
            ),
            customSearch: (searchQuery, currentRow, columns) => {
                console.log(searchQuery)
                return false
            }
            // onRowClick: (rowData, rowMeta) => {
            //     this.props.history.push(
            //         `/dashboard/orders/${orders[rowMeta.dataIndex]._id}`
            //     )
            // }
        }

        // if (this.props.isRequesting) return <CircularProgress />

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
