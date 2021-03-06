import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'mobx-react'
import stores from 'stores'
import * as serviceWorker from './serviceWorker'

import MomentUtils from '@date-io/moment'
// import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

ReactDOM.render(
    <Provider {...stores}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <App />
        </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
