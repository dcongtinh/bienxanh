export default theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.border}`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        display: 'flex',
        alignItems: 'center',
        height: '64px',
        zIndex: theme.zIndex.appBar
    },
    toolbar: {
        minHeight: 'auto',
        width: '100%'
    },
    title: {
        marginLeft: theme.spacing(),
        color: theme.palette.common.white
    },
    menuButton: {
        marginLeft: '-4px',
        color: theme.palette.common.white
    },
    notificationsButton: {
        marginLeft: 'auto'
    },
    profileButton: {
        marginLeft: 'auto'
    }
})
