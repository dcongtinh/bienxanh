import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import TextField from '@material-ui/core/TextField'
const styles = theme => ({
    closeIcon: {
        height: 20,
        width: 20,
        cursor: 'pointer',
        color: theme.palette.danger.dark
    },
    checkIcon: {
        height: 20,
        width: 20,
        cursor: 'pointer',
        color: theme.palette.success.dark
    }
})
const View = styled.div`
    cursor: pointer;
`

const Edit = styled.div`
    display: flex;
    align-items: center;
    input {
        font-size: 14px;
        width: 60px;
        color: #12161b;
    }
`

const Prefix = styled.div`
    /* margin-right: 4px; */
`

class RowItem extends Component {
    static propTypes = {
        value: PropTypes.string,
        tableMeta: PropTypes.any,
        updateValue: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            readOnly: true,
            prefix: '',
            code: '',
            value: ''
        }
    }
    getPrefix = value => {
        const values = this.state.value.split('/')
        const prefix = values[0] + '/' + values[1] + '/'
        return prefix
    }

    getCode = value => {
        const values = this.state.value.split('/')
        return values[2]
    }

    getValue = () => {
        const { prefix, code } = this.state
        return `${prefix}${code}`
    }

    handleClick = () => {
        this.setState({ readOnly: false })
    }

    handleClose = () => {
        let value = this.props.order.buyerName
        this.setState({ readOnly: true, value })
    }

    handleSave = async () => {
        const { idOrder, callback } = this.props
        let buyerName = this.getValue()
        await this.props.updateOrder({
            idOrder,
            data: { buyerName },
            callback: () => {
                if (callback) callback()
            }
        })

        this.setState({ readOnly: true })
    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.handleSave()
        }
    }

    handleChangeValue = event => {
        const value = event.target.value
        const { updateValue } = this.props
        this.setState(
            {
                code: value
            },
            () => {
                const value = this.getValue()
                updateValue(value)
                this.setState({
                    value
                })
            }
        )
    }
    componentDidMount = () => {
        let values = this.props.order.buyerName.split('/')
        this.setState({
            prefix: values[0] + '/' + values[1] + '/',
            code: values[2],
            value: this.props.order.buyerName
        })
        window.addEventListener('keydown', e => {
            if (e.keyCode === 27) this.handleClose()
        })
    }

    render() {
        let { classes } = this.props
        const { readOnly } = this.state
        const prefix = this.getPrefix()
        const code = this.getCode()
        if (!readOnly) {
            return (
                <Edit>
                    <Prefix>{prefix}</Prefix>
                    <TextField
                        autoFocus
                        value={code}
                        onChange={this.handleChangeValue}
                        onKeyPress={this.handleKeyPress}
                    />
                    <div>
                        <CloseIcon
                            className={classes.closeIcon}
                            onClick={this.handleClose}
                        />
                        <CheckIcon
                            className={classes.checkIcon}
                            onClick={this.handleSave}
                        />
                    </div>
                </Edit>
            )
        }
        return <View onClick={this.handleClick}>{this.state.value}</View>
    }
}

export default withStyles(styles)(RowItem)
