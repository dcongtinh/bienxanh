import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import VisibilityIcon from '@material-ui/icons/Visibility'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import styles from 'components/home/styles'
import moment from 'moment'

class Export extends Component {
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
        let { exportList, classes } = this.props
        const columns = [
            {
                name: 'Ngày xuất',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>{moment(value).format('DD/MM/YYYY')}</div>
                    )
                }
            },
            {
                name: 'Thanh toán',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let paid = 0
                        value.forEach(order => {
                            paid += order.payStatus
                        })
                        return <div>{`${paid}/${value.length}`}</div>
                    }
                }
            },
            {
                name: 'Xem',
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <IconButton
                            onClick={() => {
                                this.props.history.push(
                                    `/dashboard/exports/${
                                        exportList[tableMeta.rowIndex]._id
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
        exportList.forEach(exported => {
            let row = []
            row.push(exported.createdAt)
            row.push(exported.exportedList)
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
            customToolbarSelect: selectedRows => <div />,
            onRowClick: (rowData, rowMeta) => {
                this.props.history.push(
                    `/dashboard/exports/${exportList[rowMeta.dataIndex]._id}`
                )
            }
        }

        return (
            <>
                <span className={classes.spacer} />

                <MUIDataTable data={data} columns={columns} options={options} />
                {/*
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
                /> */}
            </>
        )
    }
}

export default withStyles(styles)(Export)
