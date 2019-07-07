import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'
import MuiTheme from './MuiTheme'
import stores from 'stores'
import Home from 'pages/home'
import Profile from 'pages/home/profile'
import AddUser from 'pages/home/add-user'
import View from 'pages/home/view'
import Order from 'pages/home/order'
import Export from 'pages/home/export'
import Login from 'pages/auth/login'
import Register from 'pages/auth/register'
import BaseLayout from 'components/layout/base'

class App extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <Router>
                    <MuiThemeProvider theme={MuiTheme()}>
                        <BaseLayout>
                            <Route path="/" exact component={Home} />
                            <Route path="/auth/login" component={Login} />
                            <Route path="/auth/register" component={Register} />
                            <Route
                                path="/dashboard/profile"
                                component={Profile}
                            />
                            <Route
                                path="/dashboard/add-user"
                                component={AddUser}
                            />
                            <Route path="/dashboard/view" component={View} />
                            <Route path="/dashboard/order" component={Order} />
                            <Route
                                path="/dashboard/export"
                                component={Export}
                            />
                        </BaseLayout>
                    </MuiThemeProvider>
                </Router>
            </Provider>
        )
    }
}

export default App
