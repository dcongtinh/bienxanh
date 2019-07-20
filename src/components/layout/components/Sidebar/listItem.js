import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import NotesIcon from '@material-ui/icons/Notes'
import ListIcon from '@material-ui/icons/List'
import BarChartIcon from '@material-ui/icons/BarChart'

export default [
    { title: 'Trang chủ', icon: <DashboardIcon />, link: '/' },
    {
        title: 'Quản lý nhân viên',
        icon: <PeopleIcon />,
        link: '/dashboard/users',
        access: true
    },
    {
        title: 'Nhập đơn hàng',
        icon: <NotesIcon />,
        link: '/dashboard/order/add',
        access: true
    },
    {
        title: 'Xem đơn hàng',
        icon: <ListIcon />,
        link: '/dashboard/view',
        access: true
    },
    {
        title: 'Hàng hoá',
        icon: <ListIcon />,
        link: '/dashboard/items',
        access: true
    },
    {
        title: 'Kho',
        icon: <ListIcon />,
        link: '/dashboard/warehouses',
        access: true
    },
    {
        title: 'Xuất thống kê',
        icon: <BarChartIcon />,
        link: '/dashboard/export',
        access: true
    }
]
