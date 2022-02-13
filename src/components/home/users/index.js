import React, { Component } from 'react'
import MUIDataTable from 'mui-datatables'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import ConfirmDialog from 'components/ConfirmDialog'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import styles from 'components/home/styles'

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openConfirm: false,
            selectedRows: [],
            rowsSelected: [],
        }
    }
    handleClose = () => {
        this.setState({ openConfirm: false })
    }
    render() {
        let { users, classes } = this.props
        const columns = [
            'Họ',
            'Tên',
            'Tài khoản',
            'Email',
            {
                name: 'Chỉnh sửa',
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <div className={classes.editOption}>
                            <IconButton
                                onClick={() => {
                                    this.props.history.push(
                                        `/dashboard/profile/${users[value].username}`
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
        users.forEach((user, index) => {
            let row = []
            row.push(user.firstname)
            row.push(user.lastname)
            row.push(user.username)
            row.push(user.email)
            row.push(index)
            data.push(row)
        })
        console.log(data)
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
                this.props.history.push(`/dashboard/profile/${rowData[2]}`)
            },
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
                            this.props.history.push('/dashboard/users/add-user')
                        }}
                    >
                        <AddIcon className={classes.addIcon} />
                        Add
                    </Button>
                </div>
                <MUIDataTable data={data} columns={columns} options={options} />
                <ConfirmDialog
                    open={this.state.openConfirm}
                    title="Bạn có chắc muốn xoá tài khoản ?"
                    cancelLabel="Huỷ"
                    okLabel="Xoá"
                    onHide={this.handleClose}
                    onOK={() => {
                        let usernames = []
                        this.state.rowsSelected.forEach((index) => {
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
