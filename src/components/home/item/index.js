import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import VisibilityIcon from '@material-ui/icons/Visibility'
import IconButton from '@material-ui/core/IconButton'
import AddBox from '@material-ui/icons/AddBox'
import ConfirmDialog from 'components/ConfirmDialog'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import RowItem from './row-item'
import styles from 'components/home/styles'
import numeral from 'numeral'

class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openAddItem: false,
            openConfirm: false,
            selectedRows: [],
            rowsSelected: [],
            itemName: ''
        }
    }
    handleChangeText = e => {
        this.setState({ itemName: e.target.value })
    }
    handleClose = () => {
        this.setState({ openAddItem: false, openConfirm: false })
    }
    getPrice(idWarehouse, itemPrices) {
        let prices = []
        itemPrices.forEach(itemPrice => {
            let match = itemPrice[idWarehouse] ? true : false
            if (match)
                prices.push({
                    dateApply: itemPrice.dateApply,
                    itemPrice: itemPrice[idWarehouse]
                })
        })
        prices.sort((a, b) => {
            return (
                new Date(b.dateApply).getTime() -
                new Date(a.dateApply).getTime()
            )
        })
        return prices[0] ? prices[0].itemPrice : 0
    }
    render() {
        let { itemName } = this.state
        let { classes, items } = this.props
        const columns = [
            {
                name: 'Tên hàng',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let idx =
                            typeof tableMeta.rowData !== 'string'
                                ? tableMeta.rowData[4]
                                : 0
                        return (
                            <RowItem
                                value={value}
                                tableMeta={tableMeta}
                                updateValue={updateValue}
                                updateItem={this.props.updateItem}
                                item={items[idx]}
                                idItem={items[idx] ? items[idx]._id : 0}
                            />
                        )
                    }
                }
            },
            {
                name: 'AP',
                label: 'An Phú',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            {value
                                ? numeral(value).format('(0,0.[0000])')
                                : '-'}
                        </div>
                    )
                }
            },
            {
                name: 'TL',
                label: 'Thăng Long',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            {value
                                ? numeral(value).format('(0,0.[0000])')
                                : '-'}
                        </div>
                    )
                }
            },
            {
                name: 'DN',
                label: 'Đà Nẵng',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>
                            {value
                                ? numeral(value).format('(0,0.[0000])')
                                : '-'}
                        </div>
                    )
                }
            },
            {
                name: 'Xem',
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <IconButton
                                onClick={() => {
                                    this.props.history.push(
                                        `/dashboard/items/view/${items[value]._id}`
                                    )
                                }}>
                                <VisibilityIcon />
                            </IconButton>
                        )
                    }
                }
            }
        ]
        let data = []
        items.forEach((item, index) => {
            let row = []
            row.push(item.itemName)
            row.push(this.getPrice('5d2dacc828322044ab2d2c79', item.itemPrices)) // An Phú
            row.push(this.getPrice('5d4fc31d2b427e0676ab03f4', item.itemPrices)) // Thăng Long
            row.push(this.getPrice('5d4fc2232b427e0676ab03ec', item.itemPrices)) // Đà Nẵng
            row.push(index)
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
            customToolbar: () => {
                return (
                    <Tooltip title="Thêm hàng hoá">
                        <IconButton
                            color="primary"
                            onClick={() => {
                                this.setState({ openAddItem: true })
                            }}>
                            <AddBox />
                        </IconButton>
                    </Tooltip>
                )
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
            )
        }

        return (
            <>
                <span className={classes.spacer} />

                <MUIDataTable data={data} columns={columns} options={options} />
                <ConfirmDialog
                    open={this.state.openAddItem}
                    title="Nhập hàng:"
                    cancelLabel="Đóng"
                    okLabel="Nhập"
                    input={{
                        value: itemName,
                        onChange: this.handleChangeText
                    }}
                    onHide={this.handleClose}
                    onOK={() => {
                        this.props.addItem({ itemName })
                        this.props.fetchAllItems()
                        this.handleClose()
                    }}
                />
                <ConfirmDialog
                    open={this.state.openConfirm}
                    title="Bạn có chắc muốn xoá hàng?"
                    cancelLabel="Huỷ"
                    okLabel="Xoá"
                    onHide={this.handleClose}
                    onOK={() => {
                        let itemsListId = []
                        this.state.rowsSelected.forEach(index => {
                            itemsListId.push(items[index]._id)
                        })
                        this.props.deleteItems({ itemsListId })
                        this.handleClose()
                        this.setState({ selectedRows: [] })
                    }}
                />
            </>
        )
    }
}

export default withStyles(styles)(Item)
