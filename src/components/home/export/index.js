import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import VisibilityIcon from '@material-ui/icons/Visibility'
import IconButton from '@material-ui/core/IconButton'
import ConfirmDialog from 'components/ConfirmDialog'
import { withStyles } from '@material-ui/core/styles'
import styles from 'components/home/styles'
import moment from 'moment'
import queryString from 'query-string'
import exportAPI from 'api/export.api'
import { CircularProgress } from '@material-ui/core'

class Export extends Component {
    constructor(props) {
        super(props)
        const query = queryString.parse(props.location.search)
        this.state = {
            page: query.page || 0,
            itemPerPage: query.itemPerPage || 10,
            count: props.exportsTotal,
            column: query.page === '' ? '' : query.page,
            order: query.order === '' ? '' : query.order,
            exportList: props.exportList,
            openConfirm: false,
            selectedRows: [],
            rowsSelected: []
        }
    }
    handleClose = () => {
        this.setState({ openConfirm: false })
    }
    changePage = async page => {
        this.setState({ isLoading: true })
        let { itemPerPage, order, column } = this.state
        const { success, data } = await exportAPI.getAllExports({
            page,
            itemPerPage,
            order,
            column
        })
        if (success) {
            this.setState({
                page,
                exportList: data.exportedList,
                isLoading: false
            })
        }
    }
    changeRowsPerPage = async rowsPerPage => {
        this.setState({ isLoading: true })
        let { order, column } = this.state
        console.log(rowsPerPage)
        const { success, data } = await exportAPI.getAllExports({
            itemPerPage: rowsPerPage,
            order,
            column
        })
        if (success) {
            this.setState({
                page: 0,
                itemPerPage: rowsPerPage,
                exportList: data.exportedList,
                isLoading: false
            })
        }
    }
    sortColumn = async (column, order) => {
        let { page, itemPerPage } = this.state
        this.setState({ isLoading: true })
        const { success, data } = await exportAPI.getAllExports({
            page,
            itemPerPage,
            column,
            order
        })
        if (success) {
            this.setState({
                column,
                order,
                exportList: data.exportedList,
                isLoading: false
            })
        }
    }
    render() {
        let { exportedListId, classes } = this.props
        let {
            page,
            itemPerPage,
            count,
            exportList,
            isLoading,
            column,
            order
        } = this.state
        const columns = [
            {
                name: 'Ngày xuất',
                options: {
                    sortDirection: column === 0 ? order : null,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div>{moment(value).format('DD/MM/YYYY')}</div>
                    )
                }
            },
            {
                name: 'Thanh toán',
                options: {
                    filter: false,
                    sort: false,
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
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <IconButton
                            onClick={() => {
                                this.props.history.push(
                                    `/dashboard/exports/${exportList[value]._id}`
                                )
                            }}>
                            <VisibilityIcon />
                        </IconButton>
                    )
                }
            }
        ]
        let data = []
        exportList.forEach((exported, index) => {
            let row = []
            row.push(exported.createdAt)
            row.push(exported.exportedList)
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
            serverSide: true,
            page,
            count,
            rowsPerPage: itemPerPage,
            filterType: 'dropdown',
            responsive: 'scroll',
            filter: false,
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
            },
            onTableChange: (action, tableState) => {
                // a developer could react to change on an action basis or
                // examine the state as a whole and do whatever they want
                // console.log({ action, tableState })
                switch (action) {
                    case 'changePage':
                        this.changePage(tableState.page)
                        break
                    case 'changeRowsPerPage':
                        this.changeRowsPerPage(tableState.rowsPerPage)
                        break
                    case 'sort':
                        let order =
                            tableState.announceText.indexOf('desc') !== -1
                                ? 'desc'
                                : 'asc'
                        this.sortColumn(tableState.activeColumn, order)
                        break
                    // case 'search':
                    //     this.search(tableState.searchText)
                    //     break
                    default:
                        break
                }
            }
        }

        return (
            <>
                <span className={classes.spacer} />

                <MUIDataTable
                    title={
                        <>
                            {isLoading && (
                                <CircularProgress
                                    size={24}
                                    style={{
                                        marginLeft: 15,
                                        position: 'relative',
                                        top: 4
                                    }}
                                />
                            )}
                        </>
                    }
                    data={data}
                    columns={columns}
                    options={options}
                />

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
                                exportedListId[index]
                            )
                        })
                        this.props.deleteExports({
                            exportedList,
                            exportsList,
                            callback: async () => {
                                const {
                                    success,
                                    data
                                } = await exportAPI.getAllExports({
                                    page,
                                    column,
                                    order
                                })
                                if (success) {
                                    this.setState({
                                        exportList: data.exportedList,
                                        count: data.count,
                                        isLoading: false,
                                        selectedRows: []
                                    })
                                    this.handleClose()
                                }
                            }
                        })
                    }}
                />
            </>
        )
    }
}

export default withStyles(styles)(Export)
