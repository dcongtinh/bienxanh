import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'
import MuiTheme from './MuiTheme'
import Home from 'pages/home'
import Profile from 'pages/home/profile'
import Users from 'pages/home/users'
import AddUser from 'pages/home/users/add-user'
import View from 'pages/home/view'
import Order from 'pages/home/order'
import Export from 'pages/home/export'
import Login from 'pages/auth/login'
import Register from 'pages/auth/register'
import BaseLayout from 'components/layout/base'
import Snackbar from 'components/Snackbar'
import { inject, observer } from 'mobx-react'

@inject(({ alert }) => ({
    message: alert.message,
    variant: alert.variant,
    open: alert.open,
    hide: variant => alert.hide(variant)
}))
@observer
class App extends React.Component {
    render() {
        let { message, variant, open, hide } = this.props
        return (
            <MuiThemeProvider theme={MuiTheme()}>
                <Router>
                    <BaseLayout>
                        <Route path="/" exact component={Home} />
                        <Route path="/auth/login" component={Login} />
                        <Route path="/auth/register" component={Register} />
                        <Route
                            path="/dashboard/profile/:username"
                            component={Profile}
                        />
                        <Route path="/dashboard/users" component={Users} />
                        <Route
                            path="/dashboard/users/add-user"
                            component={AddUser}
                        />
                        <Route path="/dashboard/view" component={View} />
                        <Route path="/dashboard/order" component={Order} />
                        <Route path="/dashboard/export" component={Export} />
                    </BaseLayout>
                    {open && (
                        <Snackbar
                            variant={variant}
                            message={message}
                            open={open}
                            hide={variant => hide(variant)}
                        />
                    )}
                </Router>
            </MuiThemeProvider>
        )
    }
}

export default App
