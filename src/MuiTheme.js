import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import { createMuiTheme } from '@material-ui/core/styles'

function MuiTheme() {
    const theme = createMuiTheme({
        palette: {
            type: 'light',
            primary: blue,
            secondary: red,
        },
        overrides: {
            MuiFormControl: {
                root: {
                    width: '100%',
                },
                marginNormal: {
                    marginBottom: 0,
                },
            },
            MuiFormHelperText: {
                root: {
                    '&.Mui-error': {
                        fontStyle: 'italic',
                    },
                },
            },
        },
        zIndex: {
            appBar: 1200,
            drawer: 1100,
        },
    })
    return theme
}

export default MuiTheme
