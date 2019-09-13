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
import Order from 'pages/home/order'
import Warehouse from 'pages/home/warehouse'
import AddWarehouse from 'pages/home/warehouse/add-warehouse'
import UpdateWarehouse from 'pages/home/warehouse/update-warehouse'

import AddOrder from 'pages/home/order/add-order'
import UpdateOrder from 'pages/home/order/update-order'

import Item from 'pages/home/item'
import ViewItem from 'pages/home/item/view-item'
import AddItem from 'pages/home/item/add-item'
import UpdateItem from 'pages/home/item/update-item'

import Supplier from 'pages/home/supplier'
import AddSupplier from 'pages/home/supplier/add-supplier'
import UpdateSupplier from 'pages/home/supplier/update-supplier'

import Export from 'pages/home/export'
import UpdateExport from 'pages/home/export/update-export'

import Login from 'pages/auth/login'
import Register from 'pages/auth/register'
import BaseLayout from 'components/layout/base'
import Snackbar from 'components/Snackbar'

import Caro from 'components/Caro'
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
                            <Route path="/caro" exact component={Caro} />
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
                                path="/dashboard/orders"
                                exact
                                component={Order}
                            />
                            <Route
                                path="/dashboard/order/add"
                                exact
                                component={AddOrder}
                            />
                            <Route
                                path="/dashboard/orders/:idOrder"
                                exact
                                component={UpdateOrder}
                            />
                            <Route
                                path="/dashboard/warehouses"
                                exact
                                component={Warehouse}
                            />

                            <Route
                                path="/dashboard/warehouses/add"
                                exact
                                component={AddWarehouse}
                            />
                            <Route
                                path="/dashboard/warehouses/:idWarehouse"
                                exact
                                component={UpdateWarehouse}
                            />
                            <Route
                                path="/dashboard/items"
                                exact
                                component={Item}
                            />
                            <Route
                                path="/dashboard/items/view/:idItem"
                                exact
                                component={ViewItem}
                            />
                            <Route
                                path="/dashboard/items/add"
                                exact
                                component={AddItem}
                            />
                            <Route
                                path="/dashboard/items/:idItem"
                                exact
                                component={UpdateItem}
                            />
                            <Route
                                path="/dashboard/suppliers"
                                exact
                                component={Supplier}
                            />
                            <Route
                                path="/dashboard/suppliers/add"
                                exact
                                component={AddSupplier}
                            />
                            <Route
                                path="/dashboard/suppliers/:idSupplier"
                                exact
                                component={UpdateSupplier}
                            />
                            <Route
                                path="/dashboard/exports"
                                exact
                                component={Export}
                            />
                            <Route
                                path="/dashboard/exports/:idExported"
                                exact
                                component={UpdateExport}
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
