import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import ConfirmDialog from 'components/ConfirmDialog'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import styles from './styles'

class Warehouse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openConfirm: false,
            selectedRows: [],
            rowsSelected: []
        }
    }
    handleClose = () => {
        this.setState({ openConfirm: false })
    }
    render() {
        let { wareHouses, classes } = this.props
        const columns = [
            'Mã kho',
            'Tên kho',
            'Tên khách hàng',
            'Tên đơn vị',
            'Mã số thuế',
            {
                name: 'Chỉnh sửa',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div className={classes.editOption}>
                                <IconButton
                                    onClick={() => {
                                        this.props.history.push(
                                            `/dashboard/warehouse/${
                                                wareHouses[tableMeta.rowIndex]
                                                    ._id
                                            }`
                                        )
                                    }}>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        )
                    }
                }
            }
        ]
        let data = []
        wareHouses.forEach(wareHouse => {
            let row = []
            row.push(wareHouse.buyerCode)
            row.push(`${wareHouse.warehouseName} (${wareHouse.warehouse})`)
            row.push(wareHouse.buyerName)
            row.push(wareHouse.buyerLegalName)
            row.push(wareHouse.buyerTaxCode)
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
            selectableRowsOnClick: true,
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
            onRowClick: (rowData, rowMeta) => {
                this.props.history.push(
                    `/dashboard/warehouses/${wareHouses[rowMeta.dataIndex]._id}`
                )
            }
        }

        return (
            <>
                <span className={classes.spacer} />
                <div className={classes.row}>
                    <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                        onClick={() => {
                            this.props.history.push('/dashboard/warehouses/add')
                        }}>
                        <AddIcon className={classes.addIcon} />
                        Add
                    </Button>
                </div>
                <MUIDataTable
                    title={'Danh sách kho'}
                    data={data}
                    columns={columns}
                    options={options}
                />
                <ConfirmDialog
                    open={this.state.openConfirm}
                    title="Bạn có chắc muốn xoá kho?"
                    cancelLabel="Huỷ"
                    okLabel="Xoá"
                    onHide={this.handleClose}
                    onOK={() => {
                        let wareHousesListId = []
                        this.state.rowsSelected.forEach(index => {
                            wareHousesListId.push(wareHouses[index]._id)
                        })
                        this.props.deleteWareHouses({ wareHousesListId })
                        this.handleClose()
                        this.setState({ selectedRows: [] })
                    }}
                />
            </>
        )
    }
}

export default withStyles(styles)(Warehouse)
