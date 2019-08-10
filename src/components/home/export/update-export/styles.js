export default theme => ({
    exportButton: {
        marginRight: theme.spacing()
    },
    exportIcon: {
        marginRight: theme.spacing()
    },
    addIcon: {
        marginRight: theme.spacing()
    },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(),
        marginBottom: theme.spacing()
    },
    spacer: {
        flexGrow: 1
    },
    editOption: {
        display: 'flex'
    },
    items: {
        paddingBottom: theme.spacing(),
        marginBottom: theme.spacing(),
        borderBottom: '1px solid ' + theme.palette.border
    },
    headItems: {
        minWidth: 200
    }
})
