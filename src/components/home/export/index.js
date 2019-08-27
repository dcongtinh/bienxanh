import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import VisibilityIcon from '@material-ui/icons/Visibility'
import IconButton from '@material-ui/core/IconButton'
import ConfirmDialog from 'components/ConfirmDialog'
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
        let { exportList, exportedListId, classes } = this.props
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
                    filter: false,
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
                    filter: false,
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
                    `/dashboard/exports/${exportList[rowMeta.dataIndex]._id}`
                )
            }
        }

        return (
            <>
                <span className={classes.spacer} />

                <MUIDataTable data={data} columns={columns} options={options} />

                <ConfirmDialog
                    open={this.state.openConfirm}
                    title="Bạn có chắc muốn xoá hoá đơn đã xuất?"
                    cancelLabel="Huỷ"
                    okLabel="Xoá"
                    onHide={this.handleClose}
                    onOK={() => {
                        let exportedList = [],
                            exportsList = []
                        this.state.rowsSelected.forEach(index => {
                            exportsList.push(exportList[index]._id)
                            exportedList = exportedList.concat(
                                exportedListId[index].exportedList
                            )
                        })
                        this.props.deleteExports({ exportedList, exportsList })
                        this.handleClose()
                        this.setState({ selectedRows: [] })
                    }}
                />
            </>
        )
    }
}

export default withStyles(styles)(Export)
