import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import AddBox from '@material-ui/icons/AddBox'
import ConfirmDialog from 'components/ConfirmDialog'
import { withStyles } from '@material-ui/core/styles'
import styles from 'components/home/styles'
import queryString from 'query-string'
import wareHouseAPI from 'api/warehouse.api'
import { CircularProgress } from '@material-ui/core'
class Warehouse extends Component {
    constructor(props) {
        super(props)
        const query = queryString.parse(props.location.search)
        this.state = {
            page: query.page || 0,
            itemPerPage: query.itemPerPage || 100,
            count: props.wareHousesTotal,
            column: query.page === '' ? '' : query.page,
            order: query.order === '' ? '' : query.order,
            serverSideFilterList: [],
            filters: [[], [], [], [], []],
            searchText: query.searchText || null,
            wareHouses: props.wareHouses,
            openConfirm: false,
            selectedRows: [],
            rowsSelected: [],
            isLoading: false,
        }
    }
    handleClose = () => {
        this.setState({ openConfirm: false })
    }
    changePage = async (page) => {
        this.setState({ isLoading: true })
        let { itemPerPage, order, column } = this.state
        const { success, data } = await wareHouseAPI.showAllWarehouses({
            page,
            itemPerPage,
            order,
            column,
        })
        if (success) {
            this.setState({
                page,
                wareHouses: data.wareHouses,
                isLoading: false,
            })
        }
    }
    changeRowsPerPage = async (rowsPerPage) => {
        this.setState({ isLoading: true })
        let { order, column } = this.state
        const { success, data } = await wareHouseAPI.showAllWarehouses({
            itemPerPage: rowsPerPage,
            order,
            column,
        })
        if (success) {
            this.setState({
                page: 0,
                itemPerPage: rowsPerPage,
                wareHouses: data.wareHouses,
                isLoading: false,
            })
        }
    }
    sortColumn = async (column, order) => {
        let { page, itemPerPage } = this.state
        this.setState({ isLoading: true })
        const { success, data } = await wareHouseAPI.showAllWarehouses({
            page,
            itemPerPage,
            column,
            order,
        })
        if (success) {
            this.setState({
                column,
                order,
                wareHouses: data.wareHouses,
                isLoading: false,
            })
        }
    }
    filter = async (filterList) => {
        console.log('Submitting filters: ', filterList)

        this.setState({ isLoading: true, filters: filterList })

        const { success, data } = await wareHouseAPI.showAllWarehouses({
            filters: filterList,
        })
        if (success) {
            this.setState({
                page: 0,
                itemPerPage: 100,
                column: '',
                order: '',
                wareHouses: data.wareHouses,
                isLoading: false,
            })
        }
    }
    render() {
        let { classes } = this.props
        let {
            page,
            itemPerPage,
            count,
            wareHouses,
            isLoading,
            column,
            order,
            searchText,
            filters,
        } = this.state
        const columns = [
            {
                name: 'Mã kho',
                options: {
                    sortDirection: column === 0 ? order : null,
                    filterList: filters[0],
                },
            },
            {
                name: 'Tên kho',
                options: {
                    sortDirection: column === 1 ? order : null,
                    filterList: filters[1],
                },
            },
            {
                name: 'Tên khách hàng',
                options: {
                    sortDirection: column === 2 ? order : null,
                    filterList: filters[2],
                },
            },
            {
                name: 'Tên đơn vị',
                options: {
                    sortDirection: column === 3 ? order : null,
                    filterList: filters[3],
                },
            },
            {
                name: 'Mã số thuế',
                options: {
                    sortDirection: column === 4 ? order : null,
                    filterList: filters[4],
                },
            },
            {
                name: 'Chỉnh sửa',
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div className={classes.editOption}>
                            <IconButton
                                onClick={() => {
                                    this.props.history.push(
                                        `/dashboard/warehouses/${wareHouses[value]._id}`
                                    )
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </div>
                    ),
                },
            },
        ]
        let data = []
        wareHouses.forEach((wareHouse, index) => {
            let row = []
            row.push(wareHouse.buyerCode)
            row.push(`${wareHouse.warehouseName} (${wareHouse.warehouse})`)
            row.push(wareHouse.buyerName)
            row.push(wareHouse.buyerLegalName)
            row.push(wareHouse.buyerTaxCode)
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
            serverSide: true,
            page,
            count,
            rowsPerPage: itemPerPage,
            searchText,
            filter: false,
            serverSideFilterList: filters,
            filterType: 'dropdown',
            searchable: false,
            responsive: 'scroll',
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
                    <Tooltip title="Thêm kho">
                        <IconButton
                            color="primary"
                            onClick={() => {
                                this.props.history.push(
                                    '/dashboard/warehouses/add'
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
            // onFilterChange: (column, filterList, type) => {
            //     if (type === 'chip') {
            //         console.log('updating filters via chip')
            //         this.filter(filterList)
            //     }
            // },
            // customFilterDialogFooter: filterList => {
            //     return (
            //         <div style={{ marginTop: '40px' }}>
            //             <Button
            //                 variant="contained"
            //                 onClick={() => this.filter(filterList)}>
            //                 Apply
            //             </Button>
            //         </div>
            //     )
            // },
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
            },
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
                                        top: 4,
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
                    title="Bạn có chắc muốn xoá kho?"
                    cancelLabel="Huỷ"
                    okLabel="Xoá"
                    onHide={this.handleClose}
                    onOK={() => {
                        let wareHousesListId = []
                        this.state.rowsSelected.forEach((index) => {
                            wareHousesListId.push(wareHouses[index]._id)
                        })
                        this.props.deleteWareHouses({
                            wareHousesListId,
                            callback: async () => {
                                const { success, data } =
                                    await wareHouseAPI.showAllWarehouses({
                                        page,
                                        itemPerPage,
                                        column,
                                        order,
                                    })
                                if (success) {
                                    this.setState({
                                        wareHouses: data.wareHouses,
                                        count: data.count,
                                        isLoading: false,
                                        selectedRows: [],
                                    })
                                    this.handleClose()
                                }
                            },
                        })
                    }}
                />
            </>
        )
    }
}

export default withStyles(styles)(Warehouse)
