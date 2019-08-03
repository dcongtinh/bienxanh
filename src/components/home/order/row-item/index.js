import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'

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
    min-width: 200px;
    input {
        font-size: 14px;
        width: 80px;
        border: 0;
        border-bottom: 1px solid #dfe3e8;
        outline: 0;
        background: transparent;
        padding-bottom: 4px;
        margin-top: 4px;
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
        const { idOrder } = this.props
        await this.props.updateOrder({
            idOrder,
            data: { buyerName: this.getValue() }
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
                    <input
                        autoFocus
                        value={code}
                        onChange={this.handleChangeValue}
                        onKeyPress={this.handleKeyPress}
                    />
                    <CloseIcon
                        className={classes.closeIcon}
                        onClick={this.handleClose}
                    />
                    <CheckIcon
                        className={classes.checkIcon}
                        onClick={this.handleSave}
                    />
                </Edit>
            )
        }
        return <View onClick={this.handleClick}>{this.state.value}</View>
    }
}

export default withStyles(styles)(RowItem)
