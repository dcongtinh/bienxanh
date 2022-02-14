import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import IconButton from '@material-ui/core/IconButton'
import BackupIcon from '@material-ui/icons/Backup'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import styles from './styles'
import RowEdit from 'components/home/order/row-edit'
import { observer } from 'mobx-react'
import ConfirmDialog from 'components/ConfirmDialog'
import Export from 'components/DownloadExcel/Export'
import { debounceSearchRender } from 'utils/DebounceSearchRender'
@observer
class UpdateExport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRows: [],
            rowsSelected: [],
            openConfirm: false,
            openConfirmExport: false,
        }
    }
    handleOpen = () => {
        this.setState({ openConfirm: true })
    }
    handleClose = () => {
        this.setState({ openConfirm: false, openConfirmExport: false })
    }
    render() {
        let { openConfirm, openConfirmExport } = this.state
        let { classes, exported, items, wareHouses, suppliers, users } =
            this.props
        let orders = exported.exportedList
        let itemName = {},
            whName = {},
            supplierName = {},
            userName = {}
        items.forEach((item) => {
            itemName[item._id] = item.itemName
        })
        wareHouses.forEach((warehouse) => {
            whName[warehouse._id] = {
                warehouse: warehouse.warehouse,
                warehouseName: warehouse.warehouseName,
                buyerCode: warehouse.buyerCode,
            }
        })
        suppliers.forEach((supplier) => {
            supplierName[supplier._id] = supplier.supplierCode
        })
        users.forEach((user) => {
            userName[user._id] = user.lastname
        })
        const columns = [
            'Nhóm',
            'Mã',
            'Họ tên',
            // 'Tên đơn vị',
            {
                name: 'Tên sản phẩm',
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let itemList = value.split(';')
                        return (
                            <div>
                                {itemList.map((item, index) => {
                                    if (item)
                                        return (
                                            <div
                                                className={classes.items}
                                                key={index}
                                            >
                                                {item}
                                            </div>
                                        )
                                    return null
                                })}
                            </div>
                        )
                    },
                },
            },
            {
                name: 'Số lượng',
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let quantityList = value.split(';')
                        return (
                            <div>
                                {quantityList.map((item, index) => {
                                    if (item)
                                        return (
                                            <div
                                                className={classes.items}
                                                key={index}
                                            >
                                                {item}
                                            </div>
                                        )
                                    return null
                                })}
                            </div>
                        )
                    },
                },
            },
            'Ngày giao hàng',
            'Ngày cập nhật',
            'Người cập nhật',
            'Ngày xuất BC',
            {
                name: 'Thanh toán',
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <RowEdit
                                noedit
                                style={{ marginLeft: 16 }}
                                updateOrder={this.props.updateOrder}
                                idOrder={orders[value]._id}
                                checked={orders[value].payStatus}
                                updateValue={updateValue}
                            />
                        )
                    },
                },
            },
        ]
        let data = [],
            exportedList = []
        // console.log(orders)
        orders.forEach((order, index) => {
            exportedList.push(order._id)
            let row = []
            row.push(`${order.group} ${order.mergeList.length ? '*' : ''}`)
            row.push(whName[order.warehouse].buyerCode)
            row.push(order.buyerName)
            // row.push(
            //     `${whName[order.warehouse].warehouseName} (${
            //         whName[order.warehouse].warehouse
            //     })`
            // )
            let itemList = '',
                quantityList = ''
            order.orders.forEach((item) => {
                itemList += itemName[item.itemName] + ';'
                quantityList += item.itemQuantity + ' KG;'
            })
            row.push(itemList)
            row.push(quantityList)
            row.push(moment(order.date).format('DD/MM/YYYY'))
            row.push(
                moment(order.updatedAt)
                    .utcOffset('+0700')
                    .format('HH:mm DD/MM/YYYY')
            )
            row.push(
                order.updater.firstname === order.updater.lastname
                    ? order.updater.lastname
                    : order.updater.firstname + ' ' + order.updater.lastname
            )
            if (order.reportExportedAt)
                row.push(
                    moment(order.updatedAt)
                        .utcOffset('+0700')
                        .format('HH:mm DD/MM/YYYY')
                )
            else row.push('')
            row.push(index)
            data.push(row)
        })

        let { selectedRows } = this.state
        let rowsSelected = [],
            exportList = [],
            exportIdList = []
        selectedRows.forEach((row) => {
            rowsSelected.push(row.dataIndex)
            exportList.push(orders[row.dataIndex])
            exportIdList.push(orders[row.dataIndex]._id)
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
                    toolTip: 'Sắp xếp',
                },
                pagination: {
                    next: 'Next Page',
                    previous: 'Previous Page',
                    rowsPerPage: 'Rows per page:',
                    displayRows: 'of',
                },
                toolbar: {
                    search: 'Tìm kiếm',
                    downloadCsv: 'Tải xuống CSV',
                    print: 'In',
                    viewColumns: 'Xem cột',
                    filterTable: 'Lọc bảng',
                },
                filter: {
                    all: 'All',
                    title: 'FILTERS',
                    reset: 'RESET',
                },
                viewColumns: {
                    title: 'Show Columns',
                    titleAria: 'Show/Hide Table Columns',
                },
                selectedRows: {
                    text: 'dòng được chọn!',
                    delete: 'Delete',
                    deleteAria: 'Delete Selected Rows',
                },
            },
            customSearchRender: debounceSearchRender(500),
            searchPlaceholder: 'Nhập tìm kiếm',
            customSearch: (searchQuery, currentRow, columns) => {
                let entire = true
                let searchQuerySplitted = searchQuery.split(';')
                searchQuerySplitted = searchQuerySplitted.map((search) =>
                    search.trim()
                )
                searchQuerySplitted.forEach((search) => {
                    let searchText = search.toString().toUpperCase()
                    if (search) {
                        let isFound = false
                        for (let i = 0; i < currentRow.length; ++i) {
                            let colString = currentRow[i].toString()
                            if (colString.indexOf(searchText) >= 0) {
                                isFound = true
                                break
                            }
                        }
                        entire &= isFound
                    }
                })
                return Boolean(entire)
            },
            customToolbar: () => {
                return (
                    <Tooltip title="Khôi phục hoá đơn">
                        <IconButton color="primary" onClick={this.handleOpen}>
                            <BackupIcon />
                        </IconButton>
                    </Tooltip>
                )
            },
            customToolbarSelect: (selectedRows) => {
                let rowsSelected = [],
                    exportable = true
                selectedRows.data.forEach((row) => {
                    rowsSelected.push(row.dataIndex)
                    let buyName_slpitted =
                        orders[row.dataIndex].buyerName.split('/')
                    if (!buyName_slpitted[2]) {
                        exportable = false
                    }
                })
                rowsSelected.sort()
                return (
                    <div>
                        <Tooltip title="Xuất báo cáo">
                            <IconButton
                                onClick={() => {
                                    if (exportable) {
                                        this.setState({
                                            openConfirmExport: true,
                                            selectedRows: selectedRows.data,
                                            rowsSelected,
                                        })
                                    } else {
                                        this.props.showAlert({
                                            message:
                                                'Vui lòng nhập đầy đủ SỐ HOÁ ĐƠN',
                                            variant: 'error',
                                        })
                                    }
                                }}
                            >
                                <ImportExportIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            },
        }
        return (
            <>
                <span className={classes.spacer} />
                <div className={classes.row}></div>
                <MUIDataTable data={data} columns={columns} options={options} />
                <ConfirmDialog
                    open={openConfirmExport}
                    title="Bạn có chắc muốn xuất báo cáo?"
                    cancelLabel="Huỷ"
                    okLabel={
                        <Export
                            size="small"
                            variant="outlined"
                            orders={exportList}
                            items={items}
                            itemName={itemName}
                            whName={whName}
                            suppliers={suppliers}
                            supplierName={supplierName}
                            userName={userName}
                            className={classes.exportButton}
                            onClick={() => {
                                this.handleClose()
                                this.props.exportReport({
                                    exportIdList,
                                    callback: () => {
                                        window.location.reload()
                                    },
                                })
                            }}
                        />
                    }
                    onHide={this.handleClose}
                />
                <ConfirmDialog
                    open={openConfirm}
                    title={`Bạn có chắc muốn khôi phục hoá đơn?`}
                    cancelLabel="Huỷ"
                    okLabel="Đồng ý"
                    onHide={this.handleClose}
                    onOK={() => {
                        this.props.setExport({
                            idExported: exported._id,
                            exportedList,
                            callback: () =>
                                this.props.history.push('/dashboard/orders'),
                        })
                        this.handleClose()
                    }}
                />
            </>
        )
    }
}

export default withStyles(styles)(UpdateExport)
