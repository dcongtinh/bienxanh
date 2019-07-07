import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import NotesIcon from '@material-ui/icons/Notes'
import ListIcon from '@material-ui/icons/List'
import BarChartIcon from '@material-ui/icons/BarChart'

export default [
    { title: 'Trang chủ', icon: <DashboardIcon />, link: '/' },
    {
        title: 'Thêm nhân viên',
        icon: <PersonAddIcon />,
        link: '/dashboard/add-user'
    },
    { title: 'Nhập đơn hàng', icon: <NotesIcon />, link: '/dashboard/order' },
    { title: 'Xem đơn hàng', icon: <ListIcon />, link: '/dashboard/view' },
    {
        title: 'Xuất thống kê',
        icon: <BarChartIcon />,
        link: '/dashboard/export'
    }
]
