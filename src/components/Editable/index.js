import React from 'react'
import MaterialTable from 'material-table'
import { forwardRef } from 'react'

import AddBox from '@material-ui/icons/AddBox'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

class Editable extends React.Component {
    render() {
        let { title, data, columns } = this.props
        return (
            <MaterialTable
                icons={tableIcons}
                title={title || ''}
                columns={columns}
                options={{
                    toolbarButtonAlignment: 'left'
                }}
                data={data}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                data.push(newData)
                                this.props.handleChange(data)
                                resolve()
                            }, true)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const index = data.indexOf(oldData)
                                data[index] = newData
                                this.props.handleChange(data)
                                resolve()
                            }, true)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const index = data.indexOf(oldData)
                                data.splice(index, 1)
                                this.props.handleChange(data)
                                resolve()
                            }, true)
                        })
                }}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} của {count}',
                        labelRowsSelect: 'dòng',
                        firstTooltip: 'Trang đầu',
                        nextTooltip: 'Trang sau',
                        previousTooltip: 'Trang trước',
                        lastTooltip: 'Trang cuối'
                    },
                    toolbar: {
                        nRowsSelected: '{0} dòng được chọn!',
                        searchTooltip: 'Tìm kiếm',
                        searchPlaceholder: 'Tìm kiếm'
                    },
                    header: {
                        actions: ''
                    },
                    body: {
                        emptyDataSourceMessage: 'Không tìm thấy dữ liệu!',
                        filterRow: {
                            filterTooltip: 'Filter'
                        },
                        editRow: {
                            deleteText: 'Bạn có muốn xoá dòng này?',
                            cancelTooltip: 'Huỷ',
                            saveTooltip: 'Lưu'
                        }
                    }
                }}
                style={{ marginTop: 16 }}
            />
        )
    }
}

export default Editable
