import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import stores from 'stores'
import Home from 'pages/home'
import Login from 'pages/auth/login'
import Register from 'pages/auth/register'
import BaseLayout from 'components/layout/base'

class App extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <Router>
                    <BaseLayout>
                        <Route path="/" exact component={Home} />
                        <Route path="/auth/login" component={Login} />
                        <Route path="/auth/register" component={Register} />
                    </BaseLayout>
                </Router>
            </Provider>
        )
    }
}

export default App
