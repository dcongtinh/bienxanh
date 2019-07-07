import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Header from 'components/layout/header'
import Sidebar from 'components/layout/sidebar'
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
})

@observer
class BaseLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Trang chủ',
            openDrawer: true
        }
    }
    toogleDrawer = () => {
        this.setState({ openDrawer: !this.state.openDrawer })
    }
    setTitleHeader = title => {
        this.setState({ title })
    }
    render() {
        let { classes } = this.props
        let { openDrawer, title } = this.state
        return (
            <div style={{ display: 'flex' }}>
                <CssBaseline />
                <Header
                    open={openDrawer}
                    toogleDrawer={this.toogleDrawer}
                    title={title}
                />
                <Sidebar
                    open={openDrawer}
                    toogleDrawer={this.toogleDrawer}
                    setTitleHeader={this.setTitleHeader}
                />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {this.props.children}
                    </Container>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(BaseLayout)
