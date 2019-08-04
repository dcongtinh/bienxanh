import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import ConfirmDialog from 'components/ConfirmDialog'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import styles from 'components/home/styles'

class Item extends Component {
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
        let { items, classes } = this.props
        const columns = [
            'Mã hàng',
            'Tên hàng',
            {
                name: 'Chỉnh sửa',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <div className={classes.editOption}>
                                <IconButton
                                    onClick={() => {
                                        this.props.history.push(
                                            `/dashboard/items/${
                                                items[tableMeta.rowIndex]._id
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
        items.forEach(item => {
            let row = []
            row.push(item.itemNameCode)
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
                    `/dashboard/items/${items[rowMeta.dataIndex]._id}`
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
                            this.props.history.push('/dashboard/items/add')
                        }}>
                        <AddIcon className={classes.addIcon} />
                        Add
                    </Button>
                </div>
                <MUIDataTable
                    title={'Danh sách hàng'}
                    data={data}
                    columns={columns}
                    options={options}
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
