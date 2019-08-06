import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ConfirmDialog from 'components/ConfirmDialog'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import styles from 'components/home/styles'
import warehouse from 'components/home/warehouse'
import moment from 'moment'
import numeral from 'numeral'

class ViewItem extends Component {
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
        let { item, wareHouses, classes } = this.props
        let idItem = this.props.match.params.idItem
        let columns = ['Ngày áp dụng']
        wareHouses.forEach(warehouse => {
            columns.push(warehouse.warehouse)
        })
        let data = []
        item.itemPrices.sort((a, b) => {
            return (
                new Date(b.dateApply).getTime() -
                new Date(a.dateApply).getTime()
            )
        })
        item.itemPrices.forEach(item => {
            let row = []
            row.push(moment(item.dateApply).format('DD/MM/YYYY'))
            wareHouses.forEach(warehouse => {
                let { buyerArea } = warehouse
                let check = false
                let length = item.wareHouses[buyerArea].length
                for (let i = 0; i < length; ++i) {
                    if (item.wareHouses[buyerArea][i].value === warehouse._id) {
                        check = true
                        break
                    }
                }
                if (check) row.push(numeral(item.itemPrice).format('(0,0)'))
                else row.push('')
            })
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
            )
            // onRowClick: (rowData, rowMeta) => {
            //     this.props.history.push(
            //         `/dashboard/items/${items[rowMeta.dataIndex]._id}`
            //     )
            // }
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
                            this.props.history.push(
                                `/dashboard/items/${idItem}`
                            )
                        }}
                        className={classes.actionButton}>
                        <EditIcon className={classes.addIcon} />
                        Cập nhật
                    </Button>
                    <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                        onClick={() => {
                            this.props.history.push('/dashboard/items/add')
                        }}
                        className={classes.actionButton}>
                        <DeleteIcon className={classes.addIcon} />
                        Xoá
                    </Button>
                </div>
                <MUIDataTable
                    title={'Giá bán'}
                    data={data}
                    columns={columns}
                    options={options}
                />
                {/* <MUIDataTable
                    title={'Giá mua'}
                    data={data}
                    columns={columns}
                    options={options}
                /> */}
                {/* <ConfirmDialog
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

export default withStyles(styles)(ViewItem)
