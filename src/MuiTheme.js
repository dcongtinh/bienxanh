import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import { createMuiTheme } from '@material-ui/core/styles'

function MuiTheme() {
    const theme = createMuiTheme({
        palette: {
            type: 'light',
            primary: blue,
            secondary: red
        },
        overrides: {}
    })
    return theme
}

export default MuiTheme
