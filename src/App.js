import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
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
            <MuiThemeProvider theme={theme}>
                <Router>
                    <BaseLayout>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/dashboard" exact component={Home} />
                            <Route path="/auth/login" component={Login} />
                            <Route path="/auth/register" component={Register} />
                            <Route
                                exact
                                path="/dashboard/profile/:username"
                                component={Profile}
                            />
                            <Route
                                path="/dashboard/users"
                                exact
                                component={Users}
                            />
                            <Route
                                path="/dashboard/users/add-user"
                                exact
                                component={AddUser}
                            />
                            <Route
                                path="/dashboard/view"
                                exact
                                component={View}
                            />
                            <Route
                                path="/dashboard/order"
                                exact
                                component={Order}
                            />
                            <Route
                                exact
                                path="/dashboard/export"
                                component={Export}
                            />
                            <Redirect from="/" to="/" />
                        </Switch>
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
