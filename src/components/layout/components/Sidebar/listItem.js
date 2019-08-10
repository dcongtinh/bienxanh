import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import NotesIcon from '@material-ui/icons/Notes'
import ViewListIcon from '@material-ui/icons/ViewList'
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore'
import ListIcon from '@material-ui/icons/List'
import HomeIcon from '@material-ui/icons/Home'

export default [
    { title: 'Trang chủ', icon: <DashboardIcon />, link: '/' },
    {
        title: 'Quản lý nhân viên',
        icon: <PeopleIcon />,
        link: '/dashboard/users',
        access: 'user'
    },
    {
        title: 'Nhập hoá đơn',
        icon: <NotesIcon />,
        link: '/dashboard/order/add',
        access: 'order'
    },
    {
        title: 'Xem hoá đơn',
        icon: <ViewListIcon />,
        link: '/dashboard/orders',
        access: 'order'
    },
    {
        title: 'Hàng hoá',
        icon: <LocalGroceryStoreIcon />,
        link: '/dashboard/items',
        access: 'item'
    },
    {
        title: 'Kho',
        icon: <ListIcon />,
        link: '/dashboard/warehouses',
        access: 'warehouse'
    },
    {
        title: 'Nhà cung cấp',
        icon: <HomeIcon />,
        link: '/dashboard/suppliers',
        access: 'supplier'
    }
]
