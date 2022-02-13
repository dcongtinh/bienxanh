import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import AddBox from '@material-ui/icons/AddBox'
import Tooltip from '@material-ui/core/Tooltip'
import ConfirmDialog from 'components/ConfirmDialog'
import { withStyles } from '@material-ui/core/styles'
import styles from 'components/home/styles'

class Supplier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openConfirm: false,
            selectedRows: [],
            rowsSelected: [],
            itemName: '',
        }
    }
    handleClose = () => {
        this.setState({ openConfirm: false })
    }
    render() {
        let { suppliers, classes } = this.props

        const columns = [
            'Mã',
            'Họ tên',
            'CMND',
            'Địa chỉ',
            'Ghi chú',
            {
                name: 'Chỉnh sửa',
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <IconButton
                            onClick={() => {
                                this.props.history.push(
                                    `/dashboard/suppliers/${suppliers[value]._id}`
                                )
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    ),
                },
            },
        ]
        let data = []
        suppliers.forEach((supplier, index) => {
            let row = []
            row.push(supplier.supplierCode)
            row.push(supplier.supplierName)
            row.push(supplier.supplierIdNo)
            row.push(supplier.supplierAddress)
            row.push(supplier.supplierNote)
            row.push(index)
            data.push(row)
        })

        let { selectedRows } = this.state
        let rowsSelected = []
        selectedRows.forEach((row) => {
            rowsSelected.push(row.dataIndex)
        })
        rowsSelected.sort()
        const options = {
            filterType: 'dropdown',
            responsive: 'scroll',
            filter: true,
            rowsSelected,
            selectableRowsOnClick: true,
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
            customToolbar: () => {
                return (
                    <Tooltip title="Thêm nhà cung cấp">
                        <IconButton
                            color="primary"
                            onClick={() => {
                                this.props.history.push(
                                    `/dashboard/suppliers/add`
                                )
                            }}
                        >
                            <AddBox />
                        </IconButton>
                    </Tooltip>
                )
            },
            customToolbarSelect: (selectedRows) => (
                <IconButton
                    onClick={() => {
                        let rowsSelected = []
                        selectedRows.data.forEach((row) => {
                            rowsSelected.push(row.dataIndex)
                        })
                        rowsSelected.sort()
                        this.setState({
                            openConfirm: true,
                            selectedRows: selectedRows.data,
                            rowsSelected,
                        })
                    }}
                >
                    <RemoveCircleIcon />
                </IconButton>
            ),
            onRowClick: (rowData, rowMeta) => {
                this.props.history.push(
                    `/dashboard/suppliers/${suppliers[rowMeta.dataIndex]._id}`
                )
            },
        }

        return (
            <>
                <span className={classes.spacer} />

                <MUIDataTable data={data} columns={columns} options={options} />
                <ConfirmDialog
                    open={this.state.openConfirm}
                    title="Bạn có chắc muốn xoá nhà cung cấp?"
                    cancelLabel="Huỷ"
                    okLabel="Xoá"
                    onHide={this.handleClose}
                    onOK={() => {
                        let suppliersListId = []
                        this.state.rowsSelected.forEach((index) => {
                            suppliersListId.push(suppliers[index]._id)
                        })
                        this.props.deleteSuppliers({ suppliersListId })
                        this.handleClose()
                        this.setState({ selectedRows: [] })
                    }}
                />
            </>
        )
    }
}

export default withStyles(styles)(Supplier)
