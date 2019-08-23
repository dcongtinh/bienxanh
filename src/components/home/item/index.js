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
    render() {
        let { itemName } = this.state
        let { items, classes } = this.props
        const columns = [
            {
                name: 'Tên hàng',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <RowItem
                            value={items[tableMeta.rowIndex].itemName}
                            tableMeta={tableMeta}
                            updateValue={updateValue}
                            updateItem={this.props.updateItem}
                            idItem={items[tableMeta.rowIndex]._id}
                        />
                    )
                }
            },
            {
                name: 'Xem',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <IconButton
                            onClick={() => {
                                this.props.history.push(
                                    `/dashboard/items/view/${
                                        items[tableMeta.rowIndex]._id
                                    }`
                                )
                            }}>
                            <VisibilityIcon />
                        </IconButton>
                    )
                }
            }
        ]
        let data = []

        items.forEach(item => {
            let row = []
            row.push(item.itemName)
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
                    <Tooltip title="Thêm hoá đơn">
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
