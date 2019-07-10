import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import ConfirmDialog from 'components/ConfirmDialog'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    }
})

class Users extends Component {
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
        let { users, classes } = this.props
        const columns = ['Họ', 'Tên', 'Tên tài khoản', 'Email']
        let data = []
        users.forEach(user => {
            let row = []
            row.push(user.firstname || 'a')
            row.push(user.lastname || 'a')
            row.push(user.username)
            row.push(user.email)
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
                this.props.history.push(`/dashboard/profile/${rowData[2]}`)
            }
        }

        return (
            <>
                <MUIDataTable
                    title={'Danh sách nhân viên'}
                    data={data}
                    columns={columns}
                    options={options}
                />
                <Fab
                    aria-label="Thêm tài khoản"
                    className={classes.fab}
                    color="primary"
                    onClick={() => {
                        this.props.history.push('/dashboard/users/add-user')
                    }}>
                    <AddIcon />
                </Fab>
                <ConfirmDialog
                    open={this.state.openConfirm}
                    title="Bạn có chắc muốn xoá tài khoản ?"
                    cancelLabel="Huỷ"
                    okLabel="Xoá"
                    onHide={this.handleClose}
                    onOK={() => {
                        let usernames = []
                        this.state.rowsSelected.forEach(index => {
                            usernames.push(data[index][2])
                        })
                        this.props.deleteUsers({ usernames })
                        this.handleClose()
                        this.setState({ selectedRows: [] })
                    }}
                />
            </>
        )
    }
}

export default withStyles(styles)(Users)
