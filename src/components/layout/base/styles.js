export default theme => ({
    topbar: {
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        right: 'auto',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    topbarShift: {
        marginLeft: 200,
        width: 'calc(-200px + 100vw)'
    },
    drawerPaper: {
        zIndex: 1200,
        width: 200
    },
    sidebar: {
        width: 200
    },
    content: {
        marginTop: '64px',
        padding: theme.spacing(4),
        // backgroundColor: theme.palette.background.default,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    contentShift: {
        marginLeft: 200
    }
})
